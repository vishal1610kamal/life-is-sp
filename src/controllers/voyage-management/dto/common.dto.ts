import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsObject, IsOptional, IsString, ValidateNested, IsBoolean } from 'class-validator';

export class RestQuickCodeDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  id: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  code: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  type: string;
}

export class MessageResponseDto {
  @ApiProperty()
  code: string;

  @ApiProperty()
  message: string;

  @ApiProperty()
  type: string;
}

export class PaginationRequestDto {
  @ApiProperty()
  @IsNumber()
  limit: number;
}

export class PaginationResponseDto {
  @ApiProperty()
  total: number;

  @ApiProperty()
  pages: number;

  @ApiProperty()
  current_page: number;
}

export class LoggerInUserDto {
  @ApiProperty()
  @IsString()
  loggedInUser: string;
}

export class RotationDto {
  @ApiProperty()
  @IsNumber()
  rotation_number: number;

  @ApiProperty()
  @IsNumber()
  voyage_id: number;

  @ApiProperty()
  @IsString()
  line_name: string;

  @ApiProperty()
  @IsString()
  line_code: string;

  @ApiProperty()
  @IsString()
  vessel_name: string;

  @ApiProperty()
  @IsString()
  rotation_type: string;

  @ApiProperty()
  @IsString()
  port_eta_date: string;

  @ApiProperty()
  @IsString()
  agent_code: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  berth_date: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  additional_field: string;

}


export class BasicFilterDto {
  @ApiProperty({ type: RotationDto })
  @IsObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => RotationDto)
  rotation: RotationDto;

  @ApiProperty({ type: RestQuickCodeDto })
  @IsObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => RestQuickCodeDto)
  port: RestQuickCodeDto;
}



export class AdvanceFilterDto {

  @ApiProperty()
  @IsString()
  @IsOptional()
  classification: string;

  @ApiProperty({ type: [RestQuickCodeDto] })
  @IsOptional()
  @ValidateNested()
  @Type(() => RestQuickCodeDto)
  terminal: RestQuickCodeDto[];

  @ApiProperty({ type: [RestQuickCodeDto] })
  @IsOptional()
  @ValidateNested()
  @Type(() => RestQuickCodeDto)
  category: RestQuickCodeDto[];

  @ApiProperty({ type: [] })
  @IsOptional()
  status: string[];

  @ApiProperty({ type: [RestQuickCodeDto] })
  @IsOptional()
  @ValidateNested()
  @Type(() => RestQuickCodeDto)
  iso_group: RestQuickCodeDto[];

  @ApiProperty({ type: [RestQuickCodeDto] })
  @IsOptional()
  @ValidateNested()
  @Type(() => RestQuickCodeDto)
  container_size: RestQuickCodeDto[];

  @ApiProperty({ type: [RestQuickCodeDto] })
  @IsOptional()
  @ValidateNested()
  @Type(() => RestQuickCodeDto)
  box_line: RestQuickCodeDto[];

  @ApiProperty()
  @IsString()
  @IsOptional()
  file_type: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  port_type: string;

  @ApiProperty({ type: RestQuickCodeDto })
  @IsObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => RestQuickCodeDto)
  port: RestQuickCodeDto;
}

export class ListRolloverAdvanceFilterDto {
  @ApiProperty()
  dpw_operation_type: string;

  @ApiProperty()
  terminal: string;

  @ApiProperty()
  line_code: string;

  @ApiProperty()
  iso_group: string;

  @ApiProperty()
  container_size: string;

  @ApiProperty()
  container_category: string;

  @ApiProperty()
  category_status: string;

  @ApiProperty()
  destination_port_code: string;

  @ApiProperty()
  discharge_port_code: string;

  @ApiProperty()
  outbound_rotation_number: string;
}

export class ContainerCountsDto {
  @ApiProperty()
  count_20_Feet: number;

  @ApiProperty()
  count_40_Feet: number;

  @ApiProperty()
  count_45_Feet: number;
}

export class TCountsDto {
  @ApiProperty()
  t1: number;

  @ApiProperty()
  t2: number;

  @ApiProperty()
  t3: number;

  @ApiProperty()
  t4: number;
}

export class MSDSDocumentUploadListRequestBasicFilterDto {
  @ApiProperty({ type: RotationDto })
  @IsObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => RotationDto)
  rotation: RotationDto;

  @ApiProperty({ type: RestQuickCodeDto })
  @IsObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => RestQuickCodeDto)
  port: RestQuickCodeDto;

  @ApiProperty()
  @IsString()
  @IsOptional()
  container_number: string;
}

export class MSDSDocumentUploadListRequestDtoData {
  @ApiProperty({ type: MSDSDocumentUploadListRequestBasicFilterDto })
  @IsObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => MSDSDocumentUploadListRequestBasicFilterDto)
  basic_filters: MSDSDocumentUploadListRequestBasicFilterDto;
}

export class MSDSDocumentUploadListResponseDataDto {
  @ApiProperty()
  container_number: string;

  @ApiProperty()
  container_id: number;

  @ApiProperty({ type: RestQuickCodeDto })
  @ValidateNested()
  @Type(() => RestQuickCodeDto)
  line: RestQuickCodeDto;

  @ApiProperty()
  imco_code: number;

  @ApiProperty({ type: RestQuickCodeDto })
  @ValidateNested()
  @Type(() => RestQuickCodeDto)
  iso_code: RestQuickCodeDto;

  @ApiProperty()
  un_no: number;

  @ApiProperty()
  container_sel: boolean;

  @ApiProperty({ type: RestQuickCodeDto })
  @ValidateNested()
  @Type(() => RestQuickCodeDto)
  operation_type: RestQuickCodeDto;

  @ApiProperty()
  operation_sub_type_id: number;

  @ApiProperty()
  operation_status_id: number;

  @ApiProperty({ type: RestQuickCodeDto })
  @ValidateNested()
  @Type(() => RestQuickCodeDto)
  category_status: RestQuickCodeDto;

  @ApiProperty()
  category_id: number;

  @ApiProperty()
  cut_off_exp: string;
}

export class MSDSDocumentUploadListRequestContainersDataDto {
  @ApiProperty()
  @IsString()
  container_number: string;

  @ApiProperty()
  @IsString()
  file_name: string;

  @ApiProperty()
  @IsNumber()
  document_reference_id: number;

  @ApiProperty()
  @IsNumber()
  container_id: number;

  @ApiProperty()
  @IsString()
  container_line: string;

  @ApiProperty()
  @IsNumber()
  line_id: number;

  @ApiProperty()
  @IsNumber()
  imco_code: number;

  @ApiProperty()
  @IsNumber()
  iso_code_id: number;

  @ApiProperty()
  @IsNumber()
  un_no: number;

  @ApiProperty()
  @IsBoolean()
  container_sel: boolean;

  @ApiProperty()
  @IsNumber()
  operation_type_id: number;

  @ApiProperty()
  @IsNumber()
  operation_sub_type_id: number;

  @ApiProperty()
  @IsNumber()
  operation_status_id: number;

  @ApiProperty()
  @IsString()
  category_status_id: string;

  @ApiProperty()
  @IsNumber()
  category_id: number;

  @ApiProperty()
  @IsString()
  cut_off_exp: string;
}


export class MSDSDocumentUploadSubmitRequestDataDto {
  @ApiProperty({ type: RotationDto })
  @IsObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => RotationDto)
  rotation: RotationDto;

  @ApiProperty({ type: RestQuickCodeDto })
  @IsObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => RestQuickCodeDto)
  port: RestQuickCodeDto;

  @ApiProperty({ type: MSDSDocumentUploadListRequestContainersDataDto })
  @IsObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => MSDSDocumentUploadListRequestContainersDataDto)
  containers: MSDSDocumentUploadListRequestContainersDataDto;
}


export class UploadedMSDSDocumentListResponseDataDto {
  @ApiProperty()
  container_number: string;

  @ApiProperty()
  imco: number;

  @ApiProperty()
  un_no: number;

  @ApiProperty()
  line_code: string;

  @ApiProperty()
  iso_code: string;

  @ApiProperty()
  operation_type: string;

  @ApiProperty()
  category_status: string;

  @ApiProperty()
  uploaded_date: string;

  @ApiProperty()
  uploaded_by: string;

  @ApiProperty()
  file_name: string;

  @ApiProperty()
  document_reference_id: string;
}

export class DeleteMSDSDocumentRequestDataDto {
  @ApiProperty({ type: RotationDto })
  @IsObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => RotationDto)
  rotation: RotationDto;

  @ApiProperty({ type: RestQuickCodeDto })
  @IsObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => RestQuickCodeDto)
  port: RestQuickCodeDto;

  @ApiProperty()
  @IsString()
  container_number: string;

  @ApiProperty()
  @IsString()
  document_reference_id: string;
}
