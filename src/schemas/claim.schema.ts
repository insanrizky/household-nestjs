import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Types } from 'mongoose';

export type ClaimDocument = Claim & Document;

@Schema()
export class Claim {
  @ApiProperty()
  _id: Types.ObjectId;

  @ApiProperty()
  @Prop()
  product_id: Types.ObjectId;

  @ApiProperty()
  @Prop()
  claimed_by: Types.ObjectId;

  @ApiProperty()
  @Prop()
  is_approved: boolean;

  @ApiProperty()
  @Prop()
  approved_by: Types.ObjectId;
}

export const ClaimSchema = SchemaFactory.createForClass(Claim);
