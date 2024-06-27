import { getStsIdentity } from "~/api/upload";

const OSS = require("ali-oss");
const moment = require("moment");

const env = process.env.NODE_ENV;

let expirationTime: any = null; // STS token 过期时间
let client: any = null; // OSS Client 实例

const bucket = {
  development: "filesdev",
  dev: "filesdev",
  pre: "filespre",
  beta: "filespro",
  production: "filespro",
};

// 初始化 oss client
export function initOssClient(
  accessKeyId: any,
  accessKeySecret: any,
  stsToken: any,
  expiration: any
) {
  client = new OSS({
    accessKeyId,
    accessKeySecret,
    stsToken,
    region: process.env.OSS_REGION,
    bucket: process.env.OSS_ROLE_NAME,
  });
  expirationTime = expiration;
  return client;
}

// 检查 oss 实例以及过期时间
export function checkOssClient() {
  const current = moment();
  return moment(expirationTime).diff(current) < 0 ? null : client;
}

// 用于 sts token 失效、用户登出时注销 oss client
export function destroyOssClient() {
  client = null;
}

// 图片上传至 oss
export const imgUpload = async (opt: any) => {
  if (opt.file.size > 1024 * 1024) {
    useNuxtApp().$toast.add({
      severity: "warn",
      detail: "请上传小于1MB的图片",
      life: 3000,
    });
    return;
  }
  // 获取文件后缀
  const tmp = opt.file.name.split(".");
  const extname = tmp.pop();
  const extList = ["jpg", "jpeg", "png", "gif"];
  // 校验文件类型
  const isValid = extList.includes(extname);
  if (!isValid) {
    useNuxtApp().$toast.add({
      severity: "warn",
      detail: "只支持上传 jpg、jpeg、png、gif 格式的图片",
      life: 3000,
    });
    return;
  }

  // 检查是否已有 Oss Client
  let client = checkOssClient();
  if (client === null) {
    try {
      //   const res = await this.$http.post("/ac-admin/get-sts-identity", {});
      const res = await getStsIdentity();
      if (res.code === 200) {
        const credentials = res.data.stsToken.Credentials;
        client = initOssClient(
          credentials.AccessKeyId,
          credentials.AccessKeySecret,
          credentials.SecurityToken,
          credentials.Expiration
        );
      }
    } catch (error) {
      useNuxtApp().$toast.add({
        severity: "warn",
        detail: `${error}`,
        life: 3000,
      });
      return;
    }
  }
  // 生产随机文件名
  const randomName = Array(32)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join("");
  const path = `ac/tmp-img/${randomName}.${extname}`;
  let url;
  try {
    // 使用 multipartUpload 正式上传到 oss
    const res = await client.multipartUpload(path, opt.file, {
      // 使用el时使用
      //   progress: async function (p: number) {
      //     // progress is generator
      //     let e = {};
      //     e.percent = p * 100;
      //     // 上传进度条，el-upload 组件自带的方法
      //     opt.onProgress(e);
      //   },
    });
    // 去除 oss 分片上传后返回所带的查询参数，否则访问会 403
    const ossPath = res.res.requestUrls[0].split("?")[0];
    // 替换协议，统一使用 'https://'，否则 Android 无法显示图片
    url = ossPath.replace("http://", "https://");
  } catch (error) {
    useNuxtApp().$toast.add({
      severity: "warn",
      detail: `${error}`,
      life: 3000,
    });
  }
  return url;
};
