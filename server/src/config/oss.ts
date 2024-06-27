export const ossConfig = {
  oss: {
    accessKeyId: process.env.OSS_ACCESS_KEY_ID,
    accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET,
    bucket: process.env.OSS_BUCKET,
    region: process.env.OSS_REGION,
  },
  roleName: process.env.OSS_ROLE_NAME,
};
