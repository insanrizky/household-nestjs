import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../decorator/roles.decorator';
import { CreateProductDto } from '../dto/product-create.dto';
import { UpdateProductDto } from '../dto/product-update.dto';
import { Role } from '../schemas/user.schema';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async get() {
    return this.productService.getAll();
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.STAFF)
  async add(@Body() productDto: CreateProductDto) {
    return this.productService.create(productDto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.STAFF)
  async edit(@Param() params, @Body() productDto: UpdateProductDto) {
    if (!Types.ObjectId.isValid(params.id)) {
      throw new HttpException('Product ID is invalid', HttpStatus.BAD_REQUEST);
    }

    const product = await this.productService.findById(params.id);
    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    return this.productService.edit(params.id, productDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.STAFF)
  async remove(@Param() params) {
    if (!Types.ObjectId.isValid(params.id)) {
      throw new HttpException('Product ID is invalid', HttpStatus.BAD_REQUEST);
    }

    const product = await this.productService.findById(params.id);
    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    return this.productService.remove(params.id);
  }
}
