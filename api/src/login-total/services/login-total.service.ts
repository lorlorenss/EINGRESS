import { Injectable } from '@nestjs/common';
import { _dblogstotal } from '../models/logs-total.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { totalLogs } from '../models/logs-total.interface';
import { Observable, from } from 'rxjs';

@Injectable()
export class LoginTotalService {
    constructor(
        @InjectRepository(_dblogstotal)
        private readonly totalLogsRepository: Repository<_dblogstotal>,
      ) {}
    
      // Method to retrieve today's login statistics
      getTodayLoginStatistics(): Observable<totalLogs> {
         const currentDate = new Date().toLocaleDateString();
         return from(this.totalLogsRepository.findOne({ where: { date: new Date(currentDate) } }));
      }

      // Method to update today's login statistics
      updateTodayLoginStatistics(loginstoday: string, notlogin: string): Observable<any> {
          const currentDate = new Date().toLocaleDateString();
          return from(this.totalLogsRepository.update({ date: new Date(currentDate) }, { loginstoday, notlogin }));
      }
    

      //   createDefaultEntry(): Observable<totalLogs> {
      //     const currentDate = new Date();
      //     currentDate.setHours(0, 0, 0, 0); // Set time to midnight to compare only dates
          
      //     const defaultEntry: _dblogstotal = {
      //       date: currentDate,
      //       loginstoday: '0',
      //       notlogin: '0',
      //       id: 0
      //     };
  
      //     return from(this.totalLogsRepository.save(defaultEntry));
      // }
  
      create(loginstoday: string, notlogin: string): Observable<totalLogs> {
        const currentDate = new Date().toLocaleDateString();
        const newEntry: DeepPartial<_dblogstotal> = {
          date: new Date(currentDate),
          loginstoday,
          notlogin
        };
        return from(this.totalLogsRepository.save(newEntry));
      }
      

      // create(totalLogdata: totalLogs): Observable<totalLogs>{
      //   return from(this.totalLogsRepository.save(totalLogdata));
      // }

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

  