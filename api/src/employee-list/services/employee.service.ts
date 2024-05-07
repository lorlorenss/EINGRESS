import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Observable, from, map, switchMap,mergeMap } from 'rxjs';
import { Employee } from '../models/employee.interface';
import { _dbemployee } from '../models/employee.entity';
import { _dbaccesslog } from '../../access-log/models/access-log.entity';  // Update this import path
import { AccessLogService } from 'src/access-log/services/access-log.service';

@Injectable()
export class EmployeeService {
  async processRfidData(rfid: string): Promise<void> {
    // Here you can define the logic to process the RFID data
    console.log('RFID data received:', rfid);
    // You can save the RFID data to a database or perform any other operations
  }
    constructor(
        @InjectRepository(_dbemployee)
        private readonly userRepository: Repository<_dbemployee>,
        private readonly accessLogService: AccessLogService,
        @InjectRepository(_dbaccesslog)
        private readonly accessLogRepository: Repository<_dbaccesslog>,
    ) {}

create(employee: Employee): Observable<Employee> {
  
  console.log('EMPLOYEE FINAL VALUE ', employee)
    // Save the employee data
    if (!employee.lastlogdate) {
      employee.lastlogdate = '';
    }
    return from(this.userRepository.save(employee));
   
}

    findOne(id: number): Observable<Employee> {
        return from(this.userRepository.findOne({ where: { id } }));
    }

    findAll(): Observable<Employee[]> {
        return from(this.userRepository.find({relations:['accessLogs']}));
    }


    logEmployeeAccess(employeeId: number, accessType: string, roleAtAccess: string): Observable<any> {
        // Find the employee by ID
        return from(this.userRepository.findOne({ where: { id: employeeId } })).pipe(
          switchMap(employee => {
            if (!employee) {
              throw new BadRequestException('Employee not found');
            }
      
            // Update the last login date for the employee
            const dateOnly = this.getOnlyDate(new Date().toISOString());
            employee.lastlogdate = dateOnly;
      
            // Save the updated employee
            return from(this.userRepository.save(employee)).pipe(
              switchMap(() => {
                // Log the access in AccessLogService
                return this.accessLogService.logAccess(employeeId, accessType, roleAtAccess);
              })
            );
          })
        );
      }
      
      getOnlyDate(datetime: string): string {
        const date = new Date(datetime);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
      
        return `${year}-${month}-${day}`;
      }
      

    deleteOne(id: number): Observable<any> {
        return from(this.userRepository.delete(id));
    }

    deleteEmployeeWithAccessLogs(id: number): Observable<any> {
      return from(this.userRepository.findOne({ where: { id } })).pipe(
          switchMap(user => {
              if (!user) {
                  throw new BadRequestException('User not found');
              }
              // Delete associated access logs
              return from(this.accessLogRepository.delete({ employee: user }));
          }),
          switchMap(() => this.userRepository.delete(id)) // Delete the user
      );
  }

  
    updateOne(id: number, employee: Employee): Observable<Employee> {
        return from(this.userRepository.update(id, employee)).pipe(
            switchMap(() => this.findOne(id))
        );
    }

    countEmployees(): Observable<number> {
      return from(this.userRepository.count());
  }

}


  
