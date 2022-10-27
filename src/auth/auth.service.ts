import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(data: any) {
    const user = await this.usersService.findOne(data.username);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const isValid = await bcrypt.compare(data.password, user.password);
    if (!isValid) {
      throw new HttpException('Invalid credentials', HttpStatus.FORBIDDEN);
    }

    const payload = { username: user.username, id: user._id, role: user.role };
    return {
      token_type: 'Bearer',
      access_token: this.jwtService.sign(payload),
    };
  }
}
