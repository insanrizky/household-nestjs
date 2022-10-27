import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/user-create.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UsersService } from './users.service';
import { UserDocument } from 'src/schemas/user.schema';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const encryptedPassword = await bcrypt.hash(createUserDto.password, 10);

    const data: CreateUserDto = {
      ...createUserDto,
      password: encryptedPassword,
    };
    const user: UserDocument = await this.userService.create(data);
    return _.omit(user.toObject(), ['password']);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':username')
  getProfile(@Param() params) {
    return this.userService.findOne(params.username);
  }
}
