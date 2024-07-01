import { Injectable } from '@nestjs/common';
import { ossConfig } from 'src/config';
import * as STS from '@alicloud/sts-sdk';
import { ConfigService } from '@nestjs/config';

// 初始化阿里云STS（Security Token Service）客户端
const sts = new STS({
  endpoint: 'sts.cn-wuhan-lr.aliyuncs.com',
  ...ossConfig.oss,
});

@Injectable()
export class ImgService {
  constructor(private readonly configService: ConfigService) {}

  // 获取阿里云STS（Security Token Service）临时凭证
  async getIdentityFromSTS(username: string) {
    // 获取当前用户的身份信息
    const identity = await sts.getCallerIdentity();
    // return identity;
    // 打*号是因为涉及安全问题，具体角色需要询问公司管理阿里云的同事
    // console.log(`当前用户身份信息: ${JSON.stringify(identity)}`);
    const stsToken = await sts.assumeRole(
      `acs:ram::${identity.AccountId}:role/${ossConfig.roleName}`,
      `${username}`,
    );
    console.log(`获取临时凭证成功: ${JSON.stringify(stsToken)}`);
    return {
      code: 200,
      data: {
        stsToken,
      },
      msg: 'Success',
    };
  }

  async upload() {
    return '成功访问到';
  }
}
