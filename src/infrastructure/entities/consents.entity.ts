import {
  Entity,
  Column,
  PrimaryGeneratedColumn
} from 'typeorm';
import { CommonEntity } from './common.entity';

@Entity()
export class Consents extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  function_id: string;

  @Column()
  service: string;

  @Column('text', { nullable: false })
  description: string;


}
