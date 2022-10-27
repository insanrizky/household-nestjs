import { IsIn, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { USER_TYPES } from 'src/users/constants';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;

  @IsNotEmpty()
  @IsIn(USER_TYPES)
  type: string;
}
