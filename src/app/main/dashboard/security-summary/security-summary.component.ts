import { Component, NgModule, HostListener } from '@angular/core';
import { multi } from './data';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { AccessLogService } from 'src/app/services/access-log.service';

@Component({
  selector: 'app-security-summary',
  templateUrl: './security-summary.component.html',
  styleUrls: ['./security-summary.component.css'],
})
export class SecuritySummaryComponent {
  below: any;
  multi: any[] = [];
  currentDate: string = new Date().toLocaleDateString();
  LoginsToday: number = 0; // Initialize LoginsToday property
  // options
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

  // Chart dimensions
  chartWidth: number =  10;
  chartHeight: number = 10;

  colorScheme: Color = {
    name: 'customScheme', // Provide a name for the color scheme
    selectable: true, // Whether the color scheme is selectable
    group: ScaleType.Ordinal, // Specify the group of the color scheme (e.g., 'Ordinal', 'Sequential', 'Diverging')
    domain: ['#008B38', '#2291F2'], // Array of colors
  };



  constructor(private accessLogService: AccessLogService) {
    Object.assign(this, { multi });
    this.calculateChartDimensions();
    this.onResize(null); // Initialize chart dimensions
    this.fetchLoginsToday(); // Fetch LoginsToday data
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.calculateChartDimensions();
  }

  calculateChartDimensions() {
    // Calculate chart dimensions based on container or any other logic
    this.chartWidth = window.innerWidth * 0.63; // 80% of window width
    this.chartHeight = window.innerHeight * 0.45; // 60% of window height
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
        },
        error => {
          console.error('Error fetching access logs:', error);
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
    // Format the date according to your needs
    return value;
    const date = new Date(value);
    const dayOfMonth = date.getDate();
    return dayOfMonth.toString(); // Example: '1', '2', '3', ...
  }

  yAxisTickFormatting(value: number): string {
    // Round down to nearest whole number, then convert to string
    return (Math.round(value / 1) * 1).toString();
  }

  customLegend = {
    // valueFormatting: () => true  // Always return true to enable legend
  };
}
