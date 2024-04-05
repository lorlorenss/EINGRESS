import { Component, Input, OnInit } from '@angular/core';
import { Employee } from 'src/app/interface/employee.interface';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-user-selection',
  templateUrl: './user-selection.component.html',
  styleUrls: ['./user-selection.component.css']
})
export class UserSelectionComponent implements OnInit {
  
  @Input() isHeaderChecked: boolean = false; // Receive state of header checkbox
  employee: Employee[] = [];

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
      this.employee = employee;
    })
  }

  deleteEmployee(){
    const selectedEmployee = this.employee.filter(employee => employee.selected).map(employee => employee.id)
    if(selectedEmployee.length > 0){
      this.employeeService.deleteEmployee(selectedEmployee).subscribe(()=>{
        this.loadEmployeeInfo();
      })
    }
  }

}
