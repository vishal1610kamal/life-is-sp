import { ApiProperty } from '@nestjs/swagger';
import { ConsentManagementDto } from './common.dto';
import { StaticMessageDto } from './static-message.dto';

export class GetConsentManagementResponseDto {
  @ApiProperty({ isArray: true })
  messages: StaticMessageDto[];

  @ApiProperty()
  data: ConsentManagementDto;

  constructor(message: StaticMessageDto[], data?: ConsentManagementDto) {
    this.messages = message;
    this.data = data;
  }
}
