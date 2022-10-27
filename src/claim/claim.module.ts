import { Module } from '@nestjs/common';
import { ClaimService } from './claim.service';
import { ClaimController } from './claim.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Claim, ClaimSchema } from '../schemas/claim.schema';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Claim.name, schema: ClaimSchema }]),
    ProductModule,
  ],
  controllers: [ClaimController],
  providers: [ClaimService],
})
export class ClaimModule {}
