import { ApiProperty } from '@nestjs/swagger';
import { MSDSDocumentUploadSubmitRequestDataDto, MSDSDocumentUploadListResponseDataDto } from './common.dto';
import { IsObject, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

export class MSDSDocumentUploadSubmitRequestDto {
  @ApiProperty({ type: MSDSDocumentUploadSubmitRequestDataDto })
  @IsObject()
  @ValidateNested()
  @Type(() => MSDSDocumentUploadSubmitRequestDataDto)
  data: MSDSDocumentUploadSubmitRequestDataDto;
}

export class MSDSDocumentUploadSubmitResponseDto {
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
