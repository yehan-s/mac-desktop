import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ConfigEnum } from 'enum/config.enum';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.development'],
    }),
    TypeOrmModule.forRoot({
      // type: 'mysql',
      type: process.env[ConfigEnum.DB_TYPE],
      host: process.env[ConfigEnum.DB_HOST],
      port: process.env[ConfigEnum.DB_PORT],
      username: process.env[ConfigEnum.DB_USERNAME],
      password: process.env[ConfigEnum.DB_PASSWORD],
      database: process.env[ConfigEnum.DB_DATABASE],
      autoLoadEntities: true,
      // entities: [User, Chat],
      synchronize: true,
    } as TypeOrmModuleOptions),
    AuthModule,
    ChatModule,
  ],
  controllers: [UserController],
  providers: [],
})
export class AppModule {}
