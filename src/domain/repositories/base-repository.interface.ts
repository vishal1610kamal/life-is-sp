import { Repository } from 'typeorm';
import { TransactionalDataType } from '../types/transaction.types';

export interface IBaseRepository {
  transactionalSave<T>(transactionCollection: TransactionalDataType<T>[]);
  getRepository<T>(entityCls: new () => T): Repository<T>;
}
