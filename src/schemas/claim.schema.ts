import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ClaimDocument = Claim & Document;

@Schema()
export class Claim {
  _id: Types.ObjectId;

  @Prop()
  product_id: Types.ObjectId;

  @Prop()
  claimed_by: Types.ObjectId;

  @Prop()
  is_approved: boolean;

  @Prop()
  approved_by: Types.ObjectId;
}

export const ClaimSchema = SchemaFactory.createForClass(Claim);
