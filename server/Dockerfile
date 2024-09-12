# 运行的环境 -> 基于Linux文件系统创建
FROM node:14
# 工作目录及代码
WORKDIR /app
# 构建命令
COPY . .
# 暴露的目录与端口
VOLUME [ "/app/logs" ]

EXPOSE 13000
# 运行程序的脚本或者命令
CMD ["npm","run","start:prod"]