import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateClaimDto } from '../dto/claim-create.dto';
import { UpdateClaimDto } from '../dto/claim-update.dto';
import { Claim, ClaimDocument } from '../schemas/claim.schema';

@Injectable()
export class ClaimService {
  constructor(@InjectModel(Claim.name) private model: Model<ClaimDocument>) {}

  async create(claimDto: CreateClaimDto): Promise<ClaimDocument> {
    const claim = new this.model(claimDto);
    return claim.save();
  }

  async getAll(): Promise<ClaimDocument[] | undefined> {
    return this.model.find().exec();
  }

  async getByUser(userId: string): Promise<ClaimDocument[] | undefined> {
    return this.model.find({ claimed_by: userId }).exec();
  }

  async findById(id: string): Promise<ClaimDocument | undefined> {
    return this.model.findById(id).exec();
  }

  async edit(
    id: string,
    claimDto: UpdateClaimDto,
  ): Promise<ClaimDocument | undefined> {
    return this.model.findOneAndUpdate({ _id: id }, claimDto, { new: true });
  }
}
