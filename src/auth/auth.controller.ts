import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import * as _ from 'lodash';
import { UserDocument } from 'src/schemas/user.schema';
import { UsersService } from 'src/users/users.service';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @Post('login')
  async login(@Body() creds) {
    return this.authService.login(creds);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    const user: UserDocument = await this.userService.findOne(
      req.user.username,
    );
    return _.omit(user.toObject(), ['password']);
  }
}
