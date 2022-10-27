import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

export enum Role {
  CUSTOMER = 'CUSTOMER',
  STAFF = 'STAFF',
}

@Schema()
export class User {
  @ApiProperty()
  _id: Types.ObjectId;

  @ApiProperty()
  @Prop()
  name: string;

  @ApiProperty()
  @Prop()
  username: string;

  @Prop()
  password: string;

  @ApiProperty({ enum: ['CUSTOMER', 'STAFF'] })
  @Prop()
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
