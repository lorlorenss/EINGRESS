import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

export class _dblogtotal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ })
  date: string;

  @Column()
  phone: string;

  @Column()
  notonsite: number;
}