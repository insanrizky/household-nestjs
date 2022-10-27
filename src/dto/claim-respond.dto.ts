import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class RespondClaimDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  is_approved: boolean;
}
