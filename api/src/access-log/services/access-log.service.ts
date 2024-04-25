import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { _dbaccesslog } from './../../access-log/models/access-log.entity';
import { Observable, from, map } from 'rxjs';

@Injectable()
export class AccessLogService {
  constructor(
    @InjectRepository(_dbaccesslog)
    private readonly accessLogRepository: Repository<_dbaccesslog>,
  ) {}

  findAll(): Promise<_dbaccesslog[]> {
    return this.accessLogRepository.find();
  }

  findById(id: number): Promise<_dbaccesslog> {
    return this.accessLogRepository.findOne({where:{id}}).then((accessLog) => {
      if (!accessLog) {
        throw new NotFoundException(`Access log with ID ${id} not found`);
      }
      return accessLog;
    });
  }

  create(accessLogData: Partial<_dbaccesslog>): Promise<_dbaccesslog> {
    const newAccessLog = this.accessLogRepository.create(accessLogData);
    return this.accessLogRepository.save(newAccessLog);
  }

  update(id: number, accessLogData: Partial<_dbaccesslog>): Promise<_dbaccesslog> {
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

  logAccess(employeeId: number, accessType: string, roleAtAccess: string): Observable<void> {
    // Create a new access log entry
    const accessLog: _dbaccesslog = {
      employee: {
        id: employeeId,
        fullname: '',
        phone: '',
        email: '',
        role: '',
        regdate: undefined,
        lastlogdate: '',
        profileImage: '',
        accessLogs: [],
        rfidtag: '',
        fingerprint: ''
      }, // Set employee ID
      accessDateTime: new Date(),
      accessType,
      roleAtAccess,
      id: 0,
    };

    // Save the access log
    return from(this.accessLogRepository.save(accessLog)).pipe(
      map(() => {})
    );
  }

  // AccessLogService

  findByEmployeeId(employeeId: number): Promise<_dbaccesslog[]> {
    return this.accessLogRepository.find({ where: { employee: { id: employeeId } } });
  }


}
