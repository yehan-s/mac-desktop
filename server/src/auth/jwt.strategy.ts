import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigEnum } from 'enum/config.enum';
import { ConfigService } from '@nestjs/config';
// import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env[ConfigEnum.SECRET],
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
