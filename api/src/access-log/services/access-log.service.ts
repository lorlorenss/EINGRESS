import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { _dbAccessLog } from './../../access-log/models/access-log.entity';

@Injectable()
export class AccessLogService {
  constructor(
    @InjectRepository(_dbAccessLog)
    private readonly accessLogRepository: Repository<_dbAccessLog>,
  ) {}

  findAll(): Promise<_dbAccessLog[]> {
    return this.accessLogRepository.find();
  }

  findById(id: number): Promise<_dbAccessLog> {
    return this.accessLogRepository.findOne({where:{id}}).then((accessLog) => {
      if (!accessLog) {
        throw new NotFoundException(`Access log with ID ${id} not found`);
      }
      return accessLog;
    });
  }

  create(accessLogData: Partial<_dbAccessLog>): Promise<_dbAccessLog> {
    const newAccessLog = this.accessLogRepository.create(accessLogData);
    return this.accessLogRepository.save(newAccessLog);
  }

  update(id: number, accessLogData: Partial<_dbAccessLog>): Promise<_dbAccessLog> {
    return this.findById(id).then((accessLog) => {
      this.accessLogRepository.merge(accessLog, accessLogData);
      return this.accessLogRepository.save(accessLog);
    });
  }

  delete(id: number): Promise<any> {
    return this.findById(id).then((accessLog) => {
      return this.accessLogRepository.remove(accessLog);
    });
  }
}
