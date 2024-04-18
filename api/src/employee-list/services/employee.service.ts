import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Observable, from, switchMap, mergeMap, map } from 'rxjs';
import { Employee } from '../models/employee.interface';
import { _dbemployee } from '../models/employee.entity';
import { _dbaccesslog } from '../../access-log/models/access-log.entity';  // Update this import path

@Injectable()
export class EmployeeService {
    constructor(
        @InjectRepository(_dbemployee)
        private readonly userRepository: Repository<_dbemployee>,
        @InjectRepository(_dbaccesslog)
        private readonly accessLogRepository: Repository<_dbaccesslog>,
    ) {}

    create(employee: Employee): Observable<Employee> {
        // Save the employee data
        return from(this.userRepository.save(employee));
    }

    findOne(id: number): Observable<Employee> {
        return from(this.userRepository.findOne({ where: { id } }));
    }

    findAll(): Observable<any> {
        // Fetch all employees
        return from(this.userRepository.find()).pipe(
            switchMap(employees => {
                // For each employee, fetch the last login date from the access log
                return from(employees).pipe(
                    mergeMap(employee => {
                        // Fetch the last login date for the current employee
                        return from(this.accessLogRepository.findOne({
                            where: { employee: employee },
                            order: { accessDateTime: 'DESC' },
                        })).pipe(
                            map((latestAccessLog) => {
                                // Combine employee data with last login date
                                return {
                                    id: employee.id,
                                    fullname: employee.fullname,
                                    role: employee.role,
                                    regdate: employee.regdate,
                                    lastLoginDate: latestAccessLog ? latestAccessLog.accessDateTime : null,
                                };
                            })
                        );
                    }),
                );
            })
        );
    }

    deleteOne(id: number): Observable<any> {
        return from(this.userRepository.delete(id));
    }

    updateOne(id: number, employee: Employee): Observable<Employee> {
        return from(this.userRepository.update(id, employee)).pipe(
            switchMap(() => this.findOne(id))
        );
    }
}
