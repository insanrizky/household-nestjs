import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class UpdateClaimDto {
  @IsNotEmpty()
  @IsBoolean()
  is_approved: boolean;

  @IsNotEmpty()
  @IsString()
  approved_by: string;
}
