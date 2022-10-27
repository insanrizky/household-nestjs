import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from '../dto/product-create.dto';
import { Product, ProductDocument } from '../schemas/product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private model: Model<ProductDocument>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<ProductDocument> {
    const product = new this.model(createProductDto);
    return product.save();
  }

  async getAll(): Promise<ProductDocument[] | undefined> {
    return this.model.find().exec();
  }

  async findById(id: string): Promise<ProductDocument | undefined> {
    return this.model.findById(id).exec();
  }

  async edit(
    id: string,
    productDto: CreateProductDto,
  ): Promise<ProductDocument | undefined> {
    return this.model.findOneAndUpdate({ _id: id }, productDto, { new: true });
  }

  async remove(id: string): Promise<ProductDocument | undefined> {
    return this.model.findByIdAndDelete({ _id: id });
  }
}
