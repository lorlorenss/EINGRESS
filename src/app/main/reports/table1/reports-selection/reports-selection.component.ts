import { Component } from '@angular/core';
import { Employee } from 'src/app/interface/employee.interface';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-reports-selection',
  templateUrl: './reports-selection.component.html',
  styleUrls: ['./reports-selection.component.css']
})
export class ReportsSelectionComponent {

  employee: Employee[] = [];
  
  constructor(private employeeService: EmployeeService,){}

  ngOnInit(){
    this.loadEmployeeInfo();

  }

  loadEmployeeInfo(){
    this.employeeService.getEmployee().subscribe(employee => {
      this.employee = employee;
    })
  }
}
