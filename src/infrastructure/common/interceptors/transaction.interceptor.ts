import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { LoggerService } from 'logger-lib';
import { Observable, catchError, concatMap, finalize } from 'rxjs';
import { DataSource } from 'typeorm';

export const ENTITY_MANAGER_KEY = 'ENTITY_MANAGER';

@Injectable()
export class TransactionInterceptor implements NestInterceptor {
  constructor(private dataSource: DataSource,
    private readonly logger: LoggerService
  ) { }

  async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {
    // get request object
    const req = context.switchToHttp().getRequest();
    // start transaction
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    // attach query manager with transaction to the request
    req[ENTITY_MANAGER_KEY] = queryRunner.manager;

    return next.handle().pipe(
      // concatMap gets called when route handler completes successfully
      concatMap(async (data) => {
        await queryRunner.commitTransaction();
        this.logger.log('Transaction committed');
        return data;
      }),
      // catchError gets called when route handler throws an exception
      catchError(async (e) => {
        await queryRunner.rollbackTransaction();
        this.logger.log('Transaction Rollbacked');
        throw e;
      }),
      // always executed, even if catchError method throws an exception
      finalize(async () => {
        this.logger.log('Transaction pool released');
        await queryRunner.release();
      }),
    );
  }
}
