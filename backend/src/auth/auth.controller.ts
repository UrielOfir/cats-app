import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}
  @Get('setCookie')
  setCookie(@Req() request: Request, @Res() response: Response) {
    console.log('headers:', request.headers, request.cookies);
    if (request?.cookies?.['session-uuid']) {
      return response.send({ message: 'Session cookie already set' });
    }
    const sessionUuid = this.authService.setCookie();
    response.cookie('session-uuid', sessionUuid, {
      maxAge: 24 * 60 * 60 * 1000, // For example, 1 day
      sameSite: 'none',
      secure: true,
    });
    return response.send({ message: 'Session cookie set' });
  }
}
