import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
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

  @Column()
  lastlogdate: string;

  @Column({nullable: true })
  profileImage: string;
}