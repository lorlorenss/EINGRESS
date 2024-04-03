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

  toggleCheckbox(index: number) {
    this.isHeaderChecked = !this.isHeaderChecked;
  }

  ngOnInit(){
    this.loadEmployeeInfo();
  }

  constructor(private employeeService: EmployeeService){}

  loadEmployeeInfo(){
    this.employeeService.getEmployee().subscribe(employee => {
      this.employee = employee;
    })
  }
}
