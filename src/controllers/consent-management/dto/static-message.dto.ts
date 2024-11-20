import { ApiProperty } from '@nestjs/swagger';

export class StaticMessageDto {
  @ApiProperty()
  code: string;

  @ApiProperty()
  message: string;

  @ApiProperty()
  type: string;
}
