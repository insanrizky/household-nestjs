import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../dto/user-create.dto';
import { UserService } from './user.service';
import { UserDocument } from '../schemas/user.schema';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

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
}
