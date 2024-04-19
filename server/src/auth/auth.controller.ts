import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
    console.log('auth controller', process.env.SECRET);
  }

  @Get()
  findAll(): string {
    return 'haha';
  }
  @Post('/signin')
  async signIn(@Body() dto, @Query() query) {
    const { username, password } = dto;
    const token = await this.authService.signIn(username, password);
    console.log('signin', query, token);
    // return '213123';
    return {
      access_token: token,
    };
  }

  // @UseGuards(AuthGuard('jwt'))
  @Post('/signup')
  signUp(@Body() dto, @Query() query) {
    const { username, password } = dto;
    console.log('signup', query);
    return this.authService.signUp(username, password);
  }
}
