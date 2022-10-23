import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/user-create.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':username')
  getProfile(@Param() params) {
    return this.userService.findOne(params.username);
  }
}
