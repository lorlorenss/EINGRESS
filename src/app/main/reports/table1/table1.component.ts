import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Employee } from 'src/app/interface/employee.interface';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-table1',
  templateUrl: './table1.component.html',
  styleUrls: ['./table1.component.css']
})
export class Table1Component {
  @Input() employees: Employee[] = [];
  @Output() employeeSelected = new EventEmitter<Employee>();
  selectedEmployee: Employee | null = null; // Add this line

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.loadEmployeeInfo();
  }

  loadEmployeeInfo() {
    this.employeeService.getEmployee().subscribe(employees => {
      this.employees = employees;
    });
  }

  selectEmployee(employee: Employee) {
    this.selectedEmployee = employee; // Update selectedEmployee
    this.employeeSelected.emit(employee);
  }
}
