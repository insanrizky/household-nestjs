import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { CreateUserDto } from 'src/dto/user-create.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private model: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.model(createUserDto);
    return createdUser.save();
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.model.findOne({ username }).exec();
  }
}
