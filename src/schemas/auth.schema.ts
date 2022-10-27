import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type AuthDocument = Auth & Document;

@Schema()
export class Auth {
  @ApiProperty()
  @Prop()
  token_type: string;

  @ApiProperty()
  @Prop()
  access_token: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
