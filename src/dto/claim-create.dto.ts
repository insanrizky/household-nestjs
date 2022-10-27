import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateClaimDto {
  @IsNotEmpty()
  @IsString()
  product_id: string;

  @IsNotEmpty()
  @IsString()
  claimed_by: string;

  @IsNotEmpty()
  @IsBoolean()
  is_approved: boolean;
}
