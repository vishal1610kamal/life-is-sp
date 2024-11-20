import { ApiProperty } from '@nestjs/swagger';
import { MSDSDocumentUploadListRequestDtoData, MSDSDocumentUploadListResponseDataDto } from './common.dto';
import { IsObject, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

export class MSDSDocumentUploadListRequestDto {
  @ApiProperty({ type: MSDSDocumentUploadListRequestDtoData })
  @IsObject()
  @ValidateNested()
  @Type(() => MSDSDocumentUploadListRequestDtoData)
  data: MSDSDocumentUploadListRequestDtoData;
}

export class MSDSDocumentUploadListResponseDto {
  @ApiProperty()
  code: string;

  @ApiProperty()
  message: string;

  @ApiProperty()
  status: string;

  @ApiProperty({ isArray: true, type: MSDSDocumentUploadListResponseDataDto })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MSDSDocumentUploadListResponseDataDto)
  data: MSDSDocumentUploadListResponseDataDto[];

  constructor(code: string, message: string, status: string, data: MSDSDocumentUploadListResponseDataDto[]) {
    this.code = code;
    this.message = message;
    this.status = status;
    this.data = data;
  }
}
