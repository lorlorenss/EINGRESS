import { Component } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/interface/employee.interface';


@Component({
  selector: 'app-recent-login',
  templateUrl: './recent-login.component.html',
  styleUrls: ['./recent-login.component.css']
})
export class RecentLoginComponent {
  recentLogin: Employee | null = null;

  constructor(private employeeService: EmployeeService) {
    this.findRecentLoginEmployee();
  }

  findRecentLoginEmployee(): void {
    this.employeeService.getEmployee().subscribe((employees: Employee[]) => {
      let latestLastLoginDate: Date | null = null;
      let recentLoginEmployee: Employee | null = null;

      employees.forEach((employee: Employee) => {
        if (employee.lastlogdate) {
          const lastLoginDateTime = new Date(employee.lastlogdate);
          if (!latestLastLoginDate || lastLoginDateTime > latestLastLoginDate) {
            latestLastLoginDate = lastLoginDateTime;
            recentLoginEmployee = employee;
          }
        }
      });

      this.recentLogin = recentLoginEmployee;
      console.log('Recent Login:', this.recentLogin);
    });
  }

  getProfileImage(employee: Employee | null): string {
    // Check if selectedEmployee exists and has a profileImage
    if (employee && employee.profileImage) {
      // Assuming profile image URL is relative to the base URL
      return `http://localhost:3000/api/employee/profile-image/${employee.profileImage}`;
    } else {
      // Default profile image URL
      return '/assets/images/default-profile-image.png'; // Replace with your default image path
    }
  }
}
