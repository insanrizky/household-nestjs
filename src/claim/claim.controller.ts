import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { isValidObjectId, Types } from 'mongoose';
import { Claim } from 'src/schemas/claim.schema';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../decorator/roles.decorator';
import { CreateClaimDto } from '../dto/claim-create.dto';
import { RespondClaimDto } from '../dto/claim-respond.dto';
import { UpdateClaimDto } from '../dto/claim-update.dto';
import { ProductService } from '../product/product.service';
import { Role } from '../schemas/user.schema';
import { ClaimService } from './claim.service';

@ApiTags('claims')
@Controller('claims')
export class ClaimController {
  constructor(
    private claimService: ClaimService,
    private productService: ProductService,
  ) {}

  @Get()
  @ApiOkResponse({
    description: 'Fetch claims successfully',
    type: Claim,
    isArray: true,
  })
  @UseGuards(JwtAuthGuard)
  async get(@Request() req) {
    if (req.user.role === Role.STAFF) {
      return this.claimService.getAll();
    }

    return this.claimService.getByUser(req.user.id);
  }

  @Post('products/:product_id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.CUSTOMER)
  @ApiParam({
    name: 'Product ID',
  })
  @ApiBadRequestResponse({
    description: 'Product ID is invalid',
  })
  @ApiNotFoundResponse({
    description: 'Product not found',
  })
  @ApiCreatedResponse({
    description: 'Claim is created successfully',
    type: Claim,
  })
  async add(@Param() params, @Request() req) {
    if (!isValidObjectId(params.product_id)) {
      throw new HttpException('Product ID is invalid', HttpStatus.BAD_REQUEST);
    }

    const product = await this.productService.findById(params.product_id);
    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    const claimDto: CreateClaimDto = {
      product_id: params.product_id,
      claimed_by: req.user.id,
      is_approved: null,
    };
    return this.claimService.create(claimDto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.STAFF)
  @ApiParam({
    name: 'Claim ID',
  })
  @ApiBadRequestResponse({
    description: 'Claim ID is invalid',
  })
  @ApiNotFoundResponse({
    description: 'Claim not found',
  })
  @ApiOkResponse({
    description: 'Claim is updated successfully',
    type: Claim,
  })
  async edit(
    @Param() params,
    @Body() respondClaimDto: RespondClaimDto,
    @Req() req,
  ) {
    if (!Types.ObjectId.isValid(params.id)) {
      throw new HttpException('Claim ID is invalid', HttpStatus.BAD_REQUEST);
    }

    const claim = await this.claimService.findById(params.id);
    if (!claim) {
      throw new HttpException('Claim not found', HttpStatus.NOT_FOUND);
    }

    const claimDto: UpdateClaimDto = {
      is_approved: respondClaimDto.is_approved,
      approved_by: req.user.id,
    };
    return this.claimService.edit(params.id, claimDto);
  }
}
