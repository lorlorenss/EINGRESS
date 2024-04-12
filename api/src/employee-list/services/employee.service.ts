import { Injectable } from '@nestjs/common';
import { _dbemployee } from '../models/employee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Observable, from, map, switchMap } from 'rxjs';
import { Employee } from '../models/employee.interface';
// import { HttpClient } from '@angular/common/http';

@Injectable()
export class EmployeeService {
    constructor(
        @InjectRepository(_dbemployee)
        private readonly userRepository: Repository<_dbemployee>,
        // private http: HttpClient
      ) {}

      create(employee: Employee): Observable<Employee> {
        return from(this.userRepository.save(employee));
      }

      findOne(id: number): Observable<Employee> {
        return from(this.userRepository.findOne({ where: { id } }));
      }

      // findOne(id: number): Observable<Employee>{
      //   return this.http.get('/api/employee/'+id).pipe(
      //     map((employee:Employee)=> employee)
      //   )
      // }

      findAll(): Observable<Employee[]> {
        return from(this.userRepository.find());
      }
      
      deleteOne(id: number): Observable<any> {
      return from(this.userRepository.delete(id));
      }

      updateOne(id: number, employee: Employee): Observable<Employee> {
      return from(this.userRepository.update(id, employee)).pipe(
        switchMap(()=> this.findOne(id))
      );
      }      
      
      
}
