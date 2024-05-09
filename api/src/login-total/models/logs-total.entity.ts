import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { _dbaccesslog } from '../../access-log/models/access-log.entity'; // Import the AccessLog entity

@Entity()
export class _dblogstotal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  date?: string;  

  @Column()
  loginstoday?: string;
  
  @Column()
  notlogin?: string;   


  
}
