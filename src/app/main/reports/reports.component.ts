import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/interface/employee.interface';
import { AccessLogService } from 'src/app/services/access-log.service';
import { EmployeeService } from 'src/app/services/employee.service';

import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  employeeList: Employee[] = [];
  selectedEmployee: Employee | null = null;
  loginSessions: { date: string, time: string }[] = [];
  searchTerm: string = '';
filteredEmployees: Employee[] = [];

  constructor(
    private accessLogService: AccessLogService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    // Load initial employee data and set default selected employee
    this.loadEmployeeInfo();
  }

  loadEmployeeInfo() {
    this.employeeService.getEmployee().subscribe(
      employees => {
        this.employeeList = employees;
        
        // Set default selected employee and fetch access logs
        if (this.employeeList.length > 0) {
          this.selectedEmployee = this.employeeList[0];
          this.fetchLoginSessions(this.selectedEmployee);
        }
      },
      error => {
        console.error('Error fetching employees:', error);
      }
    );
  }

  fetchLoginSessions(employee: Employee) {
    // Fetch access logs for the selected employee
    this.accessLogService.getAccessLogsByEmployeeId(employee.id)
      .subscribe(
        accessLogs => {
          this.loginSessions = accessLogs.map(log => ({
            date: new Date(log.accessDateTime).toLocaleDateString(),
            time: new Date(log.accessDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }));
          console.log('Updated login sessions:', this.loginSessions); // Log the updated login sessions
        },
        error => {
          console.error('Error fetching access logs:', error);
        }
      );
  }

  handleEmployeeSelected(employee: Employee) {
    this.selectedEmployee = employee;
    this.fetchLoginSessions(employee);
  }

  onSearchChanged(searchTerm: string) {
    this.searchTerm = searchTerm;
    this.filterEmployees();
  }
  
  filterEmployees() {
    this.filteredEmployees = this.employeeList.filter((employee: Employee) => 
      employee.fullname.toLowerCase().startsWith(this.searchTerm.toLowerCase())
    );
  }
  
}
