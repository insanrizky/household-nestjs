import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import MongoConfigService from '../configs/mongo';
import { Claim, ClaimSchema } from '../schemas/claim.schema';
import { ClaimController } from './claim.controller';
import { ClaimService } from './claim.service';
import { ProductModule } from '../product/product.module';

describe('ClaimController', () => {
  let controller: ClaimController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ProductModule,
        MongooseModule.forRootAsync({
          useClass: MongoConfigService,
        }),
        MongooseModule.forFeature([{ name: Claim.name, schema: ClaimSchema }]),
      ],
      controllers: [ClaimController],
      providers: [ClaimService],
    }).compile();

    controller = module.get<ClaimController>(ClaimController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
