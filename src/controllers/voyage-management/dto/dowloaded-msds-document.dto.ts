import { ApiProperty } from '@nestjs/swagger';
import { DeleteMSDSDocumentRequestDataDto } from './common.dto';
import { IsObject, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

export class DownloadedMSDSDocumentRequestDto {
  @ApiProperty({ type: DeleteMSDSDocumentRequestDataDto })
  @IsObject()
  @ValidateNested()
  @Type(() => DeleteMSDSDocumentRequestDataDto)
  data: DeleteMSDSDocumentRequestDataDto;
}

export class DownloadedMSDSDocumentResponseDto {
  @ApiProperty()
  code: string;

  @ApiProperty()
  message: string;

  @ApiProperty()
  type: string;

  constructor(code: string, message: string, type: string) {
    this.code = code;
    this.message = message;
    this.type = type;
  }
}
