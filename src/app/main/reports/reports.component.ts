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
  isTable1Empty: boolean = true;

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
        this.isTable1Empty = this.employeeList.length === 0; // Subaybayan kung walang nakapagpapakita sa table1

        if (this.employeeList.length > 0) {
          this.selectedEmployee = this.employeeList[0];
          this.fetchLoginSessions(this.selectedEmployee);
        } else {
          this.selectedEmployee = null; // Walang napiling empleyado kung walang nakapagpapakita sa table1
          this.loginSessions = []; // Walang nakapag-log in na sesyon kung walang nakapagpapakita sa table1
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
  
          this.filterEmployeesByDate(); // Filter employees based on selected date
          
          console.log('Updated login sessions:', this.loginSessions);
        },
        error => {
          console.error('Error fetching access logs:', error);
        }
      );
  }

  filterEmployeesByDate() {
    if (this.selectedDate) {
      this.filteredEmployees = this.employeeList.filter(employee =>
        employee.accessLogs && employee.accessLogs.some(log =>
          new Date(log.accessDateTime).toLocaleDateString() === this.selectedDate
        )
      );
    } else {
      // If no date is selected, show all employees
      this.filteredEmployees = this.employeeList;
    }
  }
  

  handleEmployeeSelected(employee: Employee) {
    this.selectedEmployee = employee;
    this.fetchLoginSessions(employee);
  }

  onSearchChanged(searchTerm: string) {
    // Filter employees whose names start with the search term
    if (searchTerm) {
      this.filteredEmployees = this.employeeList.filter(employee => 
        employee.fullname.toLowerCase().startsWith(searchTerm.toLowerCase())
      );
    } else {
      this.filteredEmployees = [...this.employeeList]; // Reset to all employees if search term is empty
    }
  
  }
  

  onDateChanged(event: MatDatepickerInputEvent<Date>) {
    if (event.value) {
      this.selectedDate = event.value.toLocaleDateString();
    } else {
      this.selectedDate = '';
    }
    
    if (this.selectedEmployee) {
      this.fetchLoginSessions(this.selectedEmployee);
    }
  }
}
