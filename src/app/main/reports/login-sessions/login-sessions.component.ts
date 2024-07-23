import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-login-sessions',
  templateUrl: './login-sessions.component.html',
  styleUrls: ['./login-sessions.component.css']
})
export class LoginSessionsComponent {
  @Input() loginSessions: { date: string, time: string }[] = [];
}
