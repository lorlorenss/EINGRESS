import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Employee } from 'src/app/interface/employee.interface';
import { EmployeeService } from 'src/app/services/employee.service';
import { AccessLogService } from 'src/app/services/access-log.service';

@Component({
  selector: 'app-table1',
  templateUrl: './table1.component.html',
  styleUrls: ['./table1.component.css']
})
export class Table1Component implements OnInit {
  baseUrl = this.employeeService.apiUrl;
  @Input() employees: Employee[] = [];
  @Output() employeeSelected = new EventEmitter<Employee>();
  selectedEmployee: Employee | null = null;
  loginSessions: { accessDateTime: Date, date: string, time: string }[] = []; // Initialize as empty array
  noEmployeesFound: boolean = false; // Variable to track if no employees are found
  constructor(
    private employeeService: EmployeeService,
    private accessLogService: AccessLogService
  ) {}

  ngOnInit() {
    this.loadEmployeeInfo();
  }

  loadEmployeeInfo() {
    this.employeeService.getEmployee().subscribe(employees => {
      this.employees = employees;
    });
  }

  selectEmployee(employee: Employee) {
    this.selectedEmployee = employee;
    this.employeeSelected.emit(employee);

    // Fetch access logs for the selected employee
    this.accessLogService.getAccessLogsByEmployeeId(employee.id)
      .subscribe(
        accessLogs => {
          this.loginSessions = accessLogs.map(log => ({
            accessDateTime: new Date(log.accessDateTime),
            date: new Date(log.accessDateTime).toLocaleDateString(),
            time: new Date(log.accessDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }));
          console.log('Updated login sessions:', this.loginSessions);
        },
        error => {
          console.error('Error fetching access logs:', error);
        }
      );
  }
}
