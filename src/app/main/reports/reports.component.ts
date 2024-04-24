import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/interface/employee.interface';
import { AccessLogService } from 'src/app/services/access-log.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

type LoginSession = {
  date: string;
  time: string;
};

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  employeeList: Employee[] = [];
  selectedEmployee: Employee | null = null;
  loginSessions: LoginSession[] = [];
  searchTerm: string = '';
  filteredEmployees: Employee[] = [];
  selectedDate: string = ''; // Store the selected date from the date picker

  constructor(
    private accessLogService: AccessLogService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.loadEmployeeInfo();
  }

  loadEmployeeInfo() {
    this.employeeService.getEmployee().subscribe(
      employees => {
        this.employeeList = employees;
        
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
    this.accessLogService.getAccessLogsByEmployeeId(employee.id)
      .subscribe(
        accessLogs => {
          this.loginSessions = accessLogs.map(log => ({
            date: new Date(log.accessDateTime).toLocaleDateString(),
            time: new Date(log.accessDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }));
  
          // If selectedDate is empty, show all login sessions
          if (!this.selectedDate) {
            console.log('All login sessions:', this.loginSessions);
            return;
          }
  
          // Filter login sessions to only show sessions for the selected date
          this.loginSessions = this.loginSessions.filter(session => session.date === this.selectedDate);
          
          console.log('Updated login sessions:', this.loginSessions);
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

  onDateChanged(event: MatDatepickerInputEvent<Date>) {
    if (event.value) {
      this.selectedDate = event.value.toLocaleDateString(); // Update selectedDate when the date picker value changes
    } else {
      this.selectedDate = ''; // Reset selectedDate if the date picker value is null or undefined
    }
    
    if (this.selectedEmployee) {
      this.fetchLoginSessions(this.selectedEmployee);
    }
  }
  

}
