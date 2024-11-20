import { FastifyRequest } from 'fastify';
import { DataSource, EntityManager, InsertResult, Repository } from 'typeorm';
import { ENTITY_MANAGER_KEY } from '../common/interceptors/transaction.interceptor';
import { TransactionalDataType } from 'src/domain/types/transaction.types';
import { IBaseRepository } from 'src/domain/repositories/base-repository.interface';
import { LoggerService } from 'logger-lib';

export class BaseRepository implements IBaseRepository {
  constructor(
    protected dataSource: DataSource,
    private readonly request: FastifyRequest,
    protected logger: LoggerService) { }

  async transactionalSave<T>(transactionCollection: TransactionalDataType<T>[]): Promise<InsertResult[]> {

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      await queryRunner.startTransaction();

      const result = await Promise.all(
        transactionCollection.map(async (transactionItem) => {
          let data: InsertResult;

          // Call the additional async functions before insertion
          if (transactionItem?.callBeforeInsert) {
            for (const asyncCall of transactionItem.callBeforeInsert) {
              await asyncCall();
            }
          }

          data = await queryRunner.manager.insert(
            transactionItem?.entityTarget,
            transactionItem?.insertionData,
          );

          // Call the additional async functions after insertion
          if (transactionItem?.callAfterInsert) {
            for (const asyncCall of transactionItem.callAfterInsert) {
              await asyncCall();
            }
          }

          return data;
        }),
      );

      await queryRunner.commitTransaction();

      this.logger.log('Transaction committed');
      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.logger.log('Transaction roll backed due to error');
      throw error; // re-throw the error
    } finally {
      await queryRunner.release();
      this.logger.log('Transaction pool released');
    }
  }

  getRepository<T>(entityCls: new () => T): Repository<T> {
    const entityManager: EntityManager = this.request[ENTITY_MANAGER_KEY] ?? this.dataSource.manager;
    return entityManager.getRepository(entityCls);
  }
}
