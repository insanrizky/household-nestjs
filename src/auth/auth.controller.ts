import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import * as _ from 'lodash';
import { User, UserDocument } from '../schemas/user.schema';
import { UserService } from '../user/user.service';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthLoginDto } from 'src/dto/auth-login.dto';
import {
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Auth } from 'src/schemas/auth.schema';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('login')
  @ApiNotFoundResponse({
    description: 'User not found',
  })
  @ApiForbiddenResponse({
    description: 'Invalid credentials',
  })
  @ApiOkResponse({
    description: 'Login successfully',
    type: Auth,
  })
  async login(@Body() creds: AuthLoginDto) {
    return this.authService.login(creds);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiOkResponse({
    description: 'User logged in fetched successfully',
    type: User,
  })
  async getProfile(@Request() req) {
    const user: UserDocument = await this.userService.findOne(
      req.user.username,
    );
    return _.omit(user.toObject(), ['password']);
  }
}
