import { Component } from '@angular/core';

@Component({
  selector: 'app-recent-login',
  templateUrl: './recent-login.component.html',
  styleUrls: ['./recent-login.component.css']
})
export class RecentLoginComponent {
  RealDate: string = this.formatDate(new Date());

  formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }
  
}
