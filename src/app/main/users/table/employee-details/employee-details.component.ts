import { Component, Input, OnInit, Output } from '@angular/core';
import { Employee } from 'src/app/interface/employee.interface';
import { EmployeeService } from 'src/app/services/employee.service';
import { UserSelectionComponent } from '../user-selection/user-selection.component';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent {
  
   employeeDetails!: Employee;
  
  showEmployeeDetails(employee: Employee){
    this.employeeDetails = employee;
  }
}
