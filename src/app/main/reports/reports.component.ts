import { Component } from '@angular/core';
import { Employee } from 'src/app/interface/employee.interface';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent {
  employeeList: Employee[] = [];
  selectedEmployee: Employee | null = null;

  handleEmployeeSelected(employee: Employee) {
    this.selectedEmployee = employee;
  }
}
