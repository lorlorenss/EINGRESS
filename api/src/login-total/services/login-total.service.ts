import { Injectable } from '@nestjs/common';
import { _dblogstotal } from '../models/logs-total.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { totalLogs } from '../models/logs-total.interface';
import { Observable, from } from 'rxjs';

@Injectable()
export class LoginTotalService {
    constructor(
        @InjectRepository(_dblogstotal)
        private readonly totalLogsRepository: Repository<_dblogstotal>,
      ) {}
    
      create(totalLogdata: totalLogs): Observable<totalLogs>{
        return from(this.totalLogsRepository.save(totalLogdata));
      }

      findOne(id:number): Observable<totalLogs>{
        return from(this.totalLogsRepository.findOne({where: {id}}));
      }
      findAll(): Observable<totalLogs[]>{
        return from(this.totalLogsRepository.find());
      }
      deleteOne(id:number): Observable<any> {
        return from(this.totalLogsRepository.delete(id));
      }
      
      updateOne(id:number, totalLogdata: totalLogs): Observable<any> {
        return from(this.totalLogsRepository.update(id,totalLogdata));
      }
      
}

  