import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { IException, IFormatExceptionMessage } from '../../domain/exceptions/exceptions.interface';

@Injectable()
export class ExceptionsService implements IException {
  badRequestException(data: IFormatExceptionMessage): void {
    throw new BadRequestException(data);
  }
  internalServerErrorException(data?: IFormatExceptionMessage): void {
    throw new InternalServerErrorException(data);
  }
  forbiddenException(data?: IFormatExceptionMessage): void {
    throw new ForbiddenException(data);
  }
  UnauthorizedException(data?: IFormatExceptionMessage): void {
    throw new UnauthorizedException(data);
  }
  DataNotFoundException(data?: IFormatExceptionMessage, status?: HttpStatus): void {
    throw new HttpException(data, status);
  }
  DataAlreadyExistException(data?: string, status?: HttpStatus): void {
    throw new HttpException(data, status);
  }
}
