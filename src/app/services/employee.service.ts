import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs';
import { Employee } from '../interface/employee.interface';
import { Subject } from 'rxjs'; 
import { forkJoin } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = '/api/employee';
  
  private deletedClickedSource = new Subject<void>();
  deletedClicked$ = this.deletedClickedSource.asObservable();

  private addUserClickedSource = new Subject<void>();
  addUserClicked$ = this.addUserClickedSource.asObservable();

  constructor(private http: HttpClient) { }

  getEmployee(): Observable<Employee[]> {
    const getEmployeeInfoUrl = `${this.apiUrl}`;
    return this.http.get<Employee[]>(getEmployeeInfoUrl);
  }

  deleteEmployee(employeeID: number[]): Observable<any>{
    const deleteEmployeeUrl = employeeID.map(id => `${this.apiUrl}/${id}`);
    const deleteRequest = deleteEmployeeUrl.map(url => this.http.delete(url));
    return forkJoin(deleteRequest);
  }

  triggerDelete(){
    this.deletedClickedSource.next();
  }

  triggerAddUser(){
    this.addUserClickedSource.next();
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, employee);
  }
  

}
