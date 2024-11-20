import { ApiProperty } from '@nestjs/swagger';
import { MSDSDocumentUploadListRequestDtoData, UploadedMSDSDocumentListResponseDataDto } from './common.dto';
import { IsObject, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

export class UploadedMSDSDocumentListRequestDto {
  @ApiProperty({ type: MSDSDocumentUploadListRequestDtoData })
  @IsObject()
  @ValidateNested()
  @Type(() => MSDSDocumentUploadListRequestDtoData)
  data: MSDSDocumentUploadListRequestDtoData;
}

export class UploadedMSDSDocumentListResponseDto {
  @ApiProperty()
  code: string;

  @ApiProperty()
  message: string;

  @ApiProperty()
  type: string;

  @ApiProperty({ isArray: true, type: UploadedMSDSDocumentListResponseDataDto })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UploadedMSDSDocumentListResponseDataDto)
  data: UploadedMSDSDocumentListResponseDataDto[];

  constructor(code: string, message: string, type: string, data: UploadedMSDSDocumentListResponseDataDto[]) {
    this.code = code;
    this.data = data;
    this.message = message;
    this.type = type;
  }
}
