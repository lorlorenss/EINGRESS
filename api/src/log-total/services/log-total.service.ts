import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Logtotal } from '../models/log-total.interface';
import { Observable, from } from 'rxjs';
import { _dblogtotal } from '../models/log-total.entity';

@Injectable()
export class DblogtotalService {
constructor(
    @InjectRepository(_dblogtotal)
    private dblogtotalRepository: Repository<_dblogtotal>,
  ) {}

  create(dblogtotal: Logtotal): Observable<_dblogtotal> {
    return from(this.dblogtotalRepository.save(dblogtotal));
  }

  // findAll(): _dblogtotal[] {
  //   return this.dblogtotalRepository.find();
  // }

  // findOne(id: number): _dblogtotal {
  //   return this.dblogtotalRepository.findOne(id);
  // }

 
  // update(id: number, newData: Partial<_dblogtotal>): _dblogtotal {
  //   this.dblogtotalRepository.update(id, newData);
  //   return this.findOne(id);
  // }

  // remove(id: number): void {
  //   this.dblogtotalRepository.delete(id);
  // }
}
