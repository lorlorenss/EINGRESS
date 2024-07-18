import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { AccessLogService } from 'src/app/services/access-log.service';
import { combineLatest } from 'rxjs';
import { AccessLog } from 'src/app/interface/access-log.interface';
import { Employee } from 'src/app/interface/employee.interface'; // Import the Employee interface

@Component({
  selector: 'app-recent-alerts',
  templateUrl: './recent-alerts.component.html',
  styleUrls: ['./recent-alerts.component.css']
})
export class RecentAlertsComponent implements OnInit {
  recentAlerts: { type: string, message: string }[] = [];
  matchedEmployees: Employee[] = [];
  maxEmployeesDisplayed: number = 4;

  constructor(private employeeService: EmployeeService, private accessLogService: AccessLogService) { }

  ngOnInit(): void {
    this.filterEmployeesByAccessLogs();
  }

  filterEmployeesByAccessLogs() {
    combineLatest([
      this.employeeService.getEmployee(),
      this.accessLogService.getAccessLogs()
    ]).subscribe(
      ([employees, accessLogs]: [Employee[], AccessLog[]]) => {
        const currentDate = new Date().toLocaleDateString();
        this.matchedEmployees = employees.filter(employee => {
          return employee.accessLogs?.some(log => new Date(log.accessDateTime).toLocaleDateString() === currentDate);
        });

        // Sort matched employees by most recent access time
        this.matchedEmployees.sort((a, b) => {
          const accessTimeA = this.getMostRecentAccessTime(a);
          const accessTimeB = this.getMostRecentAccessTime(b);
          return accessTimeB.getTime() - accessTimeA.getTime();
        });

        // Display the first 6 matched employees
        const firstSixEmployees = this.matchedEmployees.slice(0, this.maxEmployeesDisplayed);
        this.recentAlerts = firstSixEmployees.map(employee => {
          const mostRecentTime = this.getMostRecentAccessTime(employee);
          const formattedTime = mostRecentTime.toLocaleTimeString();
          return { type: 'login', message: `${employee.fullname} has entered the building at ${formattedTime}` };
        });
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
  }

  getMostRecentAccessTime(employee: Employee): Date {
    const accessTimes = employee.accessLogs?.map(log => new Date(log.accessDateTime)) || [];
    return accessTimes.reduce((mostRecent, current) => (current > mostRecent ? current : mostRecent), new Date(0));
  }
}
