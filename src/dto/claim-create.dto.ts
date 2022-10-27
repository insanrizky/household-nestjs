import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateClaimDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  product_id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  claimed_by: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  is_approved: boolean;
}
