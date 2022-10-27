import { IsBoolean, IsNotEmpty } from 'class-validator';

export class RespondClaimDto {
  @IsNotEmpty()
  @IsBoolean()
  is_approved: boolean;
}
