import { Component, Input } from '@angular/core';
import { Employee } from 'src/app/interface/employee.interface';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent {
  @Input() selectedEmployee: Employee | null = null;
}
