import { Component } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-invalid-user-dialog',
  templateUrl: './invalid-user-dialog.component.html',
  styleUrls: ['./invalid-user-dialog.component.css']
})
export class InvalidUserDialogComponent {
  @Input() errorMessage: string = 'Invalid User, please try again';
}
