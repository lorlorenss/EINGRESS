import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/interface/employee.interface';
import { AccessLogService } from 'src/app/services/access-log.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  employeeList: Employee[] = [];
  selectedEmployee: Employee | null = null;
  loginSessions: { date: string, time: string }[] = [];
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
        this.filteredEmployees = [...this.employeeList]; // Initially set filteredEmployees to all employees
        
        // Set default selected employee and fetch access logs
        if (this.filteredEmployees.length > 0) {
          this.selectedEmployee = this.filteredEmployees[0];
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
    if (searchTerm) {
      this.filteredEmployees = this.employeeList.filter(employee => 
        employee.fullname.toLowerCase().startsWith(searchTerm.toLowerCase())
      );
    } else {
      this.filteredEmployees = [...this.employeeList]; // Reset to all employees if search term is empty
    }

    if (this.filteredEmployees.length > 0) {
      this.selectedEmployee = this.filteredEmployees[0];
      this.fetchLoginSessions(this.selectedEmployee);
    } else {
      this.selectedEmployee = null;
      this.loginSessions = []; // Clear login sessions if no employees match the search term
    }
  }
}
