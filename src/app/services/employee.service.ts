import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs';
import { Employee } from '../interface/employee.interface';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = '/api/employee';

  constructor(private http: HttpClient) { }

  getEmployee(): Observable<Employee[]> {
    const getEmployeeInfo = `${this.apiUrl}`;
    return this.http.get<Employee[]>(getEmployeeInfo);
  }

}
