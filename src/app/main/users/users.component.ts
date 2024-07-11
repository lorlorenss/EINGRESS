// users.component.ts
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { AddUserFormComponent } from './add-user-form/add-user-form.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  @ViewChild(AddUserFormComponent) addUserFormContainer!: AddUserFormComponent;

  onAddUserBtnClicked(){
    this.addUserFormContainer.showAddUserForm();
  }
}
