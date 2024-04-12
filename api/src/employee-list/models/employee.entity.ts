import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { _dbAccessLog } from '../../access-log/models/access-log.entity'; // Import the AccessLog entity

@Entity()
export class _dbemployee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  fullname: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  role: string;

  @Column()
  regdate: string;

  @Column({ nullable: true })
  profileImage: string;

  // @Column({ nullable: true })
  // profileImagePath?: string;

  @OneToMany(() => _dbAccessLog, accessLog => accessLog.employee)
  accessLogs: _dbAccessLog[]; // One-to-many relationship with AccessLog
}
