import { Component, NgModule, HostListener } from '@angular/core';
import { multi } from './data';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { AccessLogService } from 'src/app/services/access-log.service';
import { EmployeeService } from 'src/app/services/employee.service'; // Import the EmployeeService
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-security-summary',
  templateUrl: './security-summary.component.html',
  styleUrls: ['./security-summary.component.css'],
})
export class SecuritySummaryComponent {
  below: any;
  multi: any[] = [];
  currentDate: string = new Date().toLocaleDateString();
  LoginsToday: number = 0; 
  total: number = 0; 
  NotOnSite: number = 0;

  showDataLabel: boolean = false;
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  yScaleMax: number = 80;
  gradient: boolean = true;
  barPadding: number = 2;
  groupPadding: number = 4;
  wrapTicks: boolean = true;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'April';
  showYAxisLabel: boolean = true;
  legendTitle: string = 'Legend';
  counter = 1;

  chartWidth: number =  10;
  chartHeight: number = 10;

  colorScheme: Color = {
    name: 'customScheme', 
    selectable: true, 
    group: ScaleType.Ordinal, 
    domain: ['#008B38', '#2291F2'], 
  };

  constructor(private accessLogService: AccessLogService, private employeeService: EmployeeService) {
    Object.assign(this, { multi });
    this.calculateChartDimensions();
    this.onResize(null); // Initialize chart dimensions
    this.fetchLoginsToday(); // Fetch LoginsToday data
    this.loadEmployeeInfo(); // Fetch total employees data
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.calculateChartDimensions();
  }

  calculateChartDimensions() {
    this.chartWidth = window.innerWidth * 0.63; 
    this.chartHeight = window.innerHeight * 0.45;
  }



  fetchLoginsToday() {
    // Call the access log service to fetch all access logs
    this.accessLogService.getAccessLogs()
      .subscribe(
        accessLogs => {
          // Filter access logs for the current date
          const todayLogs = accessLogs.filter(log => {
            const logDate = new Date(log.accessDateTime).toLocaleDateString();
            return logDate === this.currentDate;
          });
  
          // Count the number of logins for the current date
          this.LoginsToday = todayLogs.length;
          this.calculateNotOnSite(); // Calculate NotOnSite after LoginsToday is fetched
        },
        error => {
          console.error('Error fetching access logs:', error);
        }
      );
  }
  
  calculateNotOnSite() {
    // Combine the observables for total and LoginsToday
    combineLatest([
      this.employeeService.getEmployee(),
      this.accessLogService.getAccessLogs()
    ]).subscribe(
      ([employees, accessLogs]) => {
        this.total = employees.length; // Calculate total employees
  
        // Filter access logs for the current date
        const todayLogs = accessLogs.filter(log => {
          const logDate = new Date(log.accessDateTime).toLocaleDateString();
          return logDate === this.currentDate;
        });
  
        // Count the number of logins for the current date
        this.LoginsToday = todayLogs.length;
  
        // Calculate NotOnSite
        this.NotOnSite = this.total - this.LoginsToday;
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
  }


  loadEmployeeInfo() {
    this.employeeService.getEmployee().subscribe(
      employees => {
        this.total = employees.length; // Calculate total employees
      },
      error => {
        console.error('Error fetching employees:', error);
      }
    );
  }


  

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
  xAxisTickFormatting(value: any): string {
    return value;
    const date = new Date(value);
    const dayOfMonth = date.getDate();
    return dayOfMonth.toString();
  }

  yAxisTickFormatting(value: number): string {
    return (Math.round(value / 1) * 1).toString();
  }

  customLegend = {

  };
}
