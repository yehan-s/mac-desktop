import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ImgService } from './img.service';

@Controller('img')
export class ImgController {
  constructor(private readonly imgService: ImgService) {}

  @UseGuards(AuthGuard('jwt')) // jwt 登录认证，非必须
  @Post('get-sts-identity')
  async getIdentityFromSTS(@Request() req: any) {
    return await this.imgService.getIdentityFromSTS(req.user.username);
  }
}
