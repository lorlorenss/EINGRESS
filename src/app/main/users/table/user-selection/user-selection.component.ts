import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Employee } from 'src/app/interface/employee.interface';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-user-selection',
  templateUrl: './user-selection.component.html',
  styleUrls: ['./user-selection.component.css']
})
export class UserSelectionComponent implements OnInit {
  
  employees: Employee[] = [];

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

  loadEmployeeInfo(){
    this.employeeService.getEmployee().subscribe(employee => {
      this.employees = employee;
    })
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
