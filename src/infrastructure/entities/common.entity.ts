import { Column } from "typeorm";


export class CommonEntity {

  @Column({ nullable: false })
  created_by: string;

  @Column({ nullable: false })
  created_date: string;

  @Column()
  updated_by: string;

  @Column()
  updated_date: string;

  @Column()
  deleted_by: string;

  @Column()
  deleted_date: string;

  @Column()
  is_deleted: boolean;

  @Column()
  user_ip: string;

  @Column()
  user_agent: string
}
