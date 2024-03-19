// users.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  isAddUserFormVisible = false;

  toggleAddUserForm(): void {
    this.isAddUserFormVisible = !this.isAddUserFormVisible;
  }
}
