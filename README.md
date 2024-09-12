# Mac Desktop

## 项目启动

### Installation

1. 直接在根目录 pnpm i
2. 或者进入client和server目录，分别执行 pnpm i

在client目录下，创建.env.development 文件，内容如下：

```yaml
PORT=3010

API_BASE_URL=http://127.0.0.1:3000

# OSS_ACCESS_KEY_ID= 你的阿里AccessKeyId
# OSS_ACCESS_KEY_SECRET= 你的阿里AccessKeySecret
# OSS_BUCKET= 你的阿里Bucket名称
# OSS_REGION= 你的阿里区域
# OSS_ROLE_NAME= 你的阿里角色名称

# CHAT_COMPLETIONS_API_URL= 你的AI Completion API地址
# SELECTED_MODEL= 你的AI Completion模型名称
# OPENAI_API_KEY= 你的OpenAI API Key
```

创建

```yaml
暂时同上
```


在 server 目录下，创建 .env 文件，内容如下：

```yaml
OSS_ACCESS_KEY_ID= 你的阿里AccessKeyId
OSS_ACCESS_KEY_SECRET= 你的阿里AccessKeySecret
OSS_BUCKET= 你的阿里Bucket名称
OSS_REGION= 你的阿里区域，前面加上oss-,例如：oss-cn-wuhan-lr
OSS_ROLE_NAME= 你的阿里角色名称

DB_TYPE=mysql
# DB_HOST=127.0.0.1
# DB_PORT=3306

DB_SYNC=true

LOG_ON=true
LOG_LEVEL=info

# jwt secret
SECRET=111VfX5Z$zA7PWXfcFmQTQE4Y*ag93$VPfW
```


创建 .env.development 文件，内容如下：

```yaml
DB_DATABASE=test
DB_HOST=127.0.0.1
DB_PORT=3306

DB_USERNAME=root
DB_PASSWORD=example

# 用在开发过程中，每次启动都会重新创建数据库
# 生产环境需要关闭，否则会导致数据丢失
# 开启状态下，每次实体改变时，项目重启时会自动同步数据库
DB_SYNC=true

LOG_ON=true

# jwt secret
SECRET= 你的密钥
```

创建 .env.production 文件，内容如下：

```yaml
DB_DATABASE= 你的数据库名称
DB_HOST= 你的数据库地址
DB_PORT= 你的数据库端口

DB_USERNAME= 你的数据库用户名
DB_PASSWORD= 你的数据库密码

# 用在开发过程中，每次启动都会重新创建数据库
DB_SYNC=false

LOG_ON=true

# jwt secret
SECRET= 你的密钥
```


创建 docker-compose.yml 文件，内容如下：

```yaml
# Use root/example as user/password credentials
version: '3.1'

services:
  db:
    image: mysql
    command: --default-authentication-plugin=mysql_native_password
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: example
    ports:
      - 3306:3306

  adminer:
    image: adminer
    restart: always
    ports:
      - 8080:8080
```