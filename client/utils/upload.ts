import { getStsIdentity } from "~/api/upload";
import { useNuxtApp, useRuntimeConfig } from "#app";

const OSS = require("ali-oss");
const moment = require("moment");
// import moment from "moment";

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
  const runtimeConfig = useRuntimeConfig();
  client = new OSS({
    accessKeyId,
    accessKeySecret,
    stsToken,
    region: runtimeConfig.public.OSS_REGION,
    bucket: runtimeConfig.public.OSS_BUCKET,
    secure: false,
  });
  // endpoint: "sts.cn-wuhan-lr.aliyuncs.com",
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
  console.log("oss检测", opt);
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

  // 检查是否已有 Oss Client 待会开启
  //   let client = checkOssClient();

  //  这里有问题：待会检查
  //   client = initOssClient(
  //     opt.sts.AccessKeyId,
  //     opt.sts.AccessKeySecret,
  //     opt.sts.SecurityToken,
  //     opt.sts.Expiration
  //   );

  //   const runtimeConfig = useRuntimeConfig();
  //   console.log(runtimeConfig.public.OSS_REGION, runtimeConfig.public.OSS_BUCKET);
  //   console.log("oss client", client);

  if (client === null) {
    // if (1) {
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
        detail: `没有sts权限`,
        life: 3000,
      });
      console.warn("没有权限的错误", error);
      return;
    }
  }
  // 生产随机文件名
  const randomName = Array(32)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join("");
  //   const path = `ac/tmp-img/${randomName}.${extname}`;
  const path = `desktop/${randomName}.${extname}`;
  let url;
  try {
    // 使用 multipartUpload 正式上传到 oss
    // console.log(opt);
    // console.log("client", client);
    // const res = await client.multipartUpload(path, opt.file.objectURL, {
    //   // 使用el时使用
    //   //   progress: async function (p: number) {
    //   //     // progress is generator
    //   //     let e = {};
    //   //     e.percent = p * 100;
    //   //     // 上传进度条，el-upload 组件自带的方法
    //   //     opt.onProgress(e);
    //   //   },
    // });
    // const res = await client.multipartUpload(path, opt.fileObject);
    const res = await client.put(path, opt.file);
    // 去除 oss 分片上传后返回所带的查询参数，否则访问会 403
    // const ossPath = res.res.requestUrls[0].split("?")[0];
    // 替换协议，统一使用 'https://'，否则 Android 无法显示图片
    // url = ossPath.replace("http://", "https://");
    console.log("上传最后的结果", res);
    url = res.url;
  } catch (error) {
    useNuxtApp().$toast.add({
      severity: "warn",
      detail: `${error}`,
      life: 3000,
    });
    console.warn("上传图片到 oss 失败", error);
  }
  return url;
};

// 上传文件
export const fileUpload = async (
  opt: any
): Promise<{ url: string; fileName: string }> => {
  console.log("oss检测", opt);
  // 超过100MB的文件使用分片上传

  let isBigFile = false;
  if (opt.file.size > 1024 * 1024 * 100) {
    isBigFile = true;
    // useNuxtApp().$toast.add({
    //   severity: "warn",
    //   detail: "请上传小于50MB的文件",
    //   life: 3000,
    // });
    // return;
  }
  let fileName = opt.file.name;
  // 没有文件后缀限制
  // // 获取文件后缀
  const tmp = opt.file.name.split(".");
  const extname = tmp.pop();
  if (client === null) {
    try {
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
        detail: `没有sts权限`,
        life: 3000,
      });
      console.warn("没有权限的错误", error);
      return;
    }
  }
  // 生产随机文件名
  const randomName = Array(32)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join("");
  //   const path = `ac/tmp-img/${randomName}.${extname}`;
  // 存放桶内路径
  const path = `desktop/${randomName}.${extname}`;
  let url;
  try {
    let res = null;
    if (isBigFile) {
      res = await multipartUpload(path, client, opt.file);
      console.log("上传最后的结果", res);
      // 去除 oss 分片上传后返回所带的查询参数，否则访问会 403
      // 分片上传的路径
      const ossPath = res.res.requestUrls[0].split("?")[0];
      // 替换协议，统一使用 'https://'，否则 Android 无法显示图片
      url = ossPath.replace("http://", "https://");
    } else {
      res = await client.put(path, opt.file);
      console.log("上传最后的结果", res);
      url = res.url;
    }
  } catch (error) {
    useNuxtApp().$toast.add({
      severity: "warn",
      detail: `${error}`,
      life: 3000,
    });
    console.warn("上传文件到 oss 失败", error);
  }
  return { url, fileName };
};

const progress = (p: any, _checkpoint: any) => {
  // Object的上传进度。
  console.log("Object的上传进度", p);
  // 分片上传的断点信息。
  console.log("分片上传的断点信息", _checkpoint);
};

const headers = {
  // 指定Object的存储类型。
  "x-oss-storage-class": "Standard",
  // 指定Object标签，可同时设置多个标签。
  "x-oss-tagging": "Tag1=1&Tag2=2",
  // 指定初始化分片上传时是否覆盖同名Object。此处设置为true，表示禁止覆盖同名Object。
  "x-oss-forbid-overwrite": "true",
};

// 文件大于100MB时，使用分片上传。
// 开始分片上传。
async function multipartUpload(path: any, client: any, file: any) {
  try {
    // 依次填写Object完整路径（例如exampledir/exampleobject.txt）和本地文件的完整路径（例如D:\\localpath\\examplefile.txt）。Object完整路径中不能包含Bucket名称。
    // 如果本地文件的完整路径中未指定本地路径（例如examplefile.txt），则默认从示例程序所属项目对应本地路径中上传文件。
    const result = await client.multipartUpload(path, file, {
      progress,
      // headers,
      // 指定meta参数，自定义Object的元数据。通过head接口可以获取到Object的meta数据。
      // meta: {
      //   year: 2020,
      //   people: "test",
      // },
    });
    // 如果需要元数据的话
    // 在上传文件的时候可以添加
    // const head = await client.head(path);
    // console.log("文件元数据", head);
    return result;
  } catch (e: any) {
    // 捕获超时异常。
    if (e.code === "ConnectionTimeoutError") {
      console.log("TimeoutError");
      // do ConnectionTimeoutError operation
    }
    console.log(e);
  }
}
