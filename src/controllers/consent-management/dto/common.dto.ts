import { ApiProperty } from '@nestjs/swagger';

export class ConsentManagementDto {
  @ApiProperty()
  consent_id: string;

  @ApiProperty()
  consent_version: string;

  @ApiProperty()
  definition: string;
}
