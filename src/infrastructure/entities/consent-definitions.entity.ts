import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn
} from 'typeorm';
import { CommonEntity } from './common.entity';
import { Consents } from './consents.entity';

@Entity()
export class ConsentDefinitions extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Consents)
  @JoinColumn({ name: 'consent_id' })
  @Column()
  consent_id: string;

  @Column()
  lang_code: string;

  @Column()
  version: string;

  @Column('text', { nullable: false })
  definition: string;

  @Column({ type: 'timestamp', precision: 0, nullable: true })
  expiry_date: string;

  @Column({ type: 'boolean' })
  is_active: boolean;
}
