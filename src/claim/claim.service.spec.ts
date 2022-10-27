import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import MongoConfigService from '../configs/mongo';
import { Claim, ClaimSchema } from '../schemas/claim.schema';
import { ClaimService } from './claim.service';

describe('ClaimService', () => {
  let service: ClaimService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRootAsync({
          useClass: MongoConfigService,
        }),
        MongooseModule.forFeature([{ name: Claim.name, schema: ClaimSchema }]),
      ],
      providers: [ClaimService],
    }).compile();

    service = module.get<ClaimService>(ClaimService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
