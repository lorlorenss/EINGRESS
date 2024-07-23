// add-user-btn.component.ts
import { Component, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-add-user-btn',
  templateUrl: './add-user-btn.component.html',
  styleUrls: ['./add-user-btn.component.css']
})
export class AddUserBtnComponent {
  @Output() addUserClicked = new EventEmitter<void>();

  onAddUserClicked(){
    this.addUserClicked.emit();
  }
}
