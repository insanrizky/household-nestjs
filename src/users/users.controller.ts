import * as bcrypt from 'bcrypt';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/user-create.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const salt = await bcrypt.genSalt();
    const encryptedPassword = await bcrypt.hash(createUserDto.password, salt);

    const data: CreateUserDto = {
      ...createUserDto,
      password: encryptedPassword,
    };
    return this.userService.create(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':username')
  getProfile(@Param() params) {
    return this.userService.findOne(params.username);
  }
}
