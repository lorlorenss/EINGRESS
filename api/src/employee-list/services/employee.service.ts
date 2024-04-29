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
    constructor(
        @InjectRepository(_dbemployee)
        private readonly userRepository: Repository<_dbemployee>,
        private readonly accessLogService: AccessLogService,
        @InjectRepository(_dbaccesslog)
        private readonly accessLogRepository: Repository<_dbaccesslog>,
    ) {}

//     create(employee: Employee, file: Express.Multer.File): Observable<Employee> {
//       // Check if the file is provided
//       if (!file) {
//           throw new BadRequestException('No file uploaded');
//       }

//       // Save the file to disk
//       const profileImage = file.filename;

//       // Set the profile image in the employee data
//       employee.profileImage = profileImage;

//       // Save the employee data
//       return from(this.userRepository.save(employee));
//   }

create(employee: Employee): Observable<Employee> {
  
  employee.lastlogdate = '';
  console.log('EMPLOYEE FINAL VALUE ', employee)
    // Save the employee data
    return from(this.userRepository.save(employee));
   
}

    findOne(id: number): Observable<Employee> {
        return from(this.userRepository.findOne({ where: { id } }));
    }

    findAll(): Observable<Employee[]> {
        return from(this.userRepository.find());
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

    updaterfidtag(id: number, rfidtag: string): Observable<Employee> {
  return from(this.userRepository.findOne({ where: { id } })).pipe(
    switchMap(employee => {
      if (!employee) {
        throw new BadRequestException('Employee not found');
      }

      employee.rfidtag = rfidtag;

      return from(this.userRepository.save(employee)).pipe(
        switchMap(() => this.findOne(id))
      );
    })
  );
}

  
    updatefingerprint(id: number, fingerprint: string): Observable<Employee> {
      return from(this.userRepository.findOne({ where: { id } })).pipe(
        switchMap(employee => {
          if (!employee) {
            throw new BadRequestException('Employee not found');
          }
  
          employee.fingerprint = fingerprint;
  
          return from(this.userRepository.save(employee)).pipe(
            switchMap(() => this.findOne(id))
          );
        })
      );
    }
    

}


    // logEmployeeAccess(employeeId: number, accessType: string, roleAtAccess: string): Observable<any> {
    //     // Find the employee by ID
    //     return from(this.userRepository.findOne({ where: { id: employeeId } })).pipe(
    //         switchMap(employee => {
    //             if (!employee) {
    //                 throw new BadRequestException('Employee not found');
    //             }

    //             // Update the last login date for the employee
    //             employee.lastlogdate = new Date().toISOString();
    //             return from(this.userRepository.save(employee)).pipe(
    //                 switchMap(() => {
    //                     // Create a new accessLog entry
    //                     const accessLog = new _dbaccesslog();
    //                     accessLog.employee = employee;
    //                     accessLog.accessDateTime = new Date();
    //                     accessLog.accessType = accessType;
    //                     accessLog.roleAtAccess = roleAtAccess;

    //                     return from(this.accessLogRepository.save(accessLog));
    //                 })
    //             );
    //         })
    //     );
    // } 

    
//     findAll(): Observable<any> {
//       // Fetch all employees
//       return from(this.userRepository.find()).pipe(
//           switchMap(employees => {
//               // For each employee, fetch the last login date from the access log
//               return from(employees).pipe(
//                   mergeMap(employee => {
//                       // Fetch the last login date for the current employee
//                       return from(this.accessLogRepository.findOne({
//                           where: { employee: employee },
//                           order: { accessDateTime: 'DESC' },
//                       })).pipe(
//                           map((latestAccessLog) => {
//                               // Combine employee data with last login date
//                               return {
//                                   id: employee.id,
//                                   fullname: employee.fullname,
//                                   role: employee.role,
//                                   regdate: employee.regdate,
//                                   lastLoginDate: latestAccessLog ? latestAccessLog.accessDateTime : null,
//                               };
//                           })
//                       );
//                   }),
//               );
//           })
//       );
//   }
  
  
