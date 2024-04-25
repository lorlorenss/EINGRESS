import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Employee } from 'src/app/interface/employee.interface';
import { EmployeeService } from 'src/app/services/employee.service';
import { startWith, switchMap } from 'rxjs/operators';
import { Subscription, of } from 'rxjs';

@Component({
  selector: 'app-user-selection',
  templateUrl: './user-selection.component.html',
  styleUrls: ['./user-selection.component.css']
})
export class UserSelectionComponent implements OnInit, OnDestroy {
  
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  searchSubscription: Subscription | undefined;

  @Output() employeeSelected = new EventEmitter<any>();

  toggleSelection(employee: Employee): void{
    employee.selected = !employee.selected;
  }

  constructor(private employeeService: EmployeeService,){}

  ngOnInit(){
    this.loadEmployeeInfo();

    this.employeeService.deletedClicked$.subscribe(() => {
      this.deleteEmployee();
    });
    
  }

  ngOnDestroy(){
    if(this.searchSubscription){
      this.searchSubscription.unsubscribe;
    }
  }

  loadEmployeeInfo(){
    this.searchSubscription = this.employeeService.searchUserClicked$.pipe(
      startWith(''),
      switchMap( searchInputValue => {
        if(!searchInputValue.trim()){
          return this.employeeService.getEmployee();
        }
        else{
          return this.employeeService.searchEmployee(searchInputValue);
        }
      })
    ).subscribe(employees => {
      this.employees = employees;
      this.filteredEmployees = [...this.employees];
    });
  }

  deleteEmployee(){
    const selectedEmployee = this.employees.filter(employees => employees.selected).map(employees => employees.id)
    if(selectedEmployee.length > 0){
      this.employeeService.deleteEmployee(selectedEmployee).subscribe(()=>{
        this.loadEmployeeInfo();
      })
    }
  }

  selectedEmployee(employee: Employee){
    this.employeeSelected.emit(employee);
  }
}
