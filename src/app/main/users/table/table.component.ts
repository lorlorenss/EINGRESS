import { Component, EventEmitter, ViewChild, } from '@angular/core';
import { UserSelectionComponent } from './user-selection/user-selection.component';
import { Employee } from 'src/app/interface/employee.interface';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent  {
  @ViewChild(EmployeeDetailsComponent) employeeDetailsComponent!: EmployeeDetailsComponent; 

  onEmployeeSelected(employee: Employee){
    this.employeeDetailsComponent.showEmployeeDetails(employee);
  }
}
