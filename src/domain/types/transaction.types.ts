import { ENTITIES } from '../../infrastructure/common/constants/constants';
export type TransactionalDataType<T> = {
  entityTarget: ENTITIES;
  insertionData: T;
  callBeforeInsert?: (() => Promise<unknown>)[];
  callAfterInsert?: (() => Promise<unknown>)[];
};
