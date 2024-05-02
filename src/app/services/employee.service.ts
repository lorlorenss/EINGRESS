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

  private searchedUserTriggerSource = new Subject<string>();
  searchUserTrigger$ = this.searchedUserTriggerSource.asObservable();

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

  addEmployee(employee: Employee, file: File): Observable<any> {
    const formData: FormData = new FormData();
    console.log(employee);
    formData.append('file', file); // Assuming the profileImage is always present
    formData.append('employee', JSON.stringify(employee)); // Convert employee object to JSON string
    return this.http.post<any>(`${this.apiUrl}`, formData);
  }

  updateEmployee(id: number, employee: Employee, file: File): Observable<any>{
    const formData: FormData = new FormData();
    formData.append('file', file); // Append the file to the FormData
    formData.append('employee', JSON.stringify(employee)); // Append the employee object to the FormData
  
    const updateEmployeeUrl = `${this.apiUrl}/${id}`
    return this.http.put<Employee>(updateEmployeeUrl, formData); // Use FormData in the PUT request
  }
  

  searchEmployee(searchInputValue: string): Observable<Employee[]>{
    return this.getEmployee().pipe(
      map(employees => {
        const filteredEmployees = employees.filter(
          employee => employee.fullname.toLowerCase().includes(searchInputValue.toLowerCase())
        );
        return filteredEmployees;
      })
    );
  }

  triggerDelete(){
    this.deletedClickedSource.next();
  }

  triggerSearchUser(searchInputValue: string){
    this.searchedUserTriggerSource.next(searchInputValue);
  }

  reloadPage(){
    window.location.reload();
  }

}
