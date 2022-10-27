import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class UpdateClaimDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  is_approved: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  approved_by: string;
}
