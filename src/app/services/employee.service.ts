import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs';
import { Employee } from '../interface/employee.interface';
import { Subject } from 'rxjs'; 
import { forkJoin } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = '/api/employee';
  
  private deletedClickedSource = new Subject<void>();
  deletedClicked$ = this.deletedClickedSource.asObservable();

  private searchedUserClickedSource = new Subject<string>();
  searchUserClicked$ = this.searchedUserClickedSource.asObservable();

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

  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, employee);
  }

  updateEmployee(id: number, employee: Employee): Observable<any>{
    const updateEmployeeUrl = `${this.apiUrl}/${id}`
    return this.http.put<Employee>(updateEmployeeUrl, employee);
  }

  searchEmployee(searchInputValue: string): Observable<Employee[]>{
    return this.getEmployee().pipe(
      map(employees => {
        const filteredEmployees = employees.filter(
          employee => employee.fullname.toLowerCase().includes(searchInputValue.toLowerCase())
        );

        if(filteredEmployees.length === 0){
          return [{ id: 0, fullname: 'No matching results found', role: '', lastlogdate: '', email: '', phone: '' }];
        }
        else{
          return filteredEmployees;
        }
      })
    );
  }

  triggerDelete(){
    this.deletedClickedSource.next();
  }

  triggerSearchUser(searchInputValue: string){
    this.searchedUserClickedSource.next(searchInputValue);
  }

}
