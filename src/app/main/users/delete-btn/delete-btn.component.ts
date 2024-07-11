import { Component, EventEmitter, Output } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-delete-btn',
  templateUrl: './delete-btn.component.html',
  styleUrls: ['./delete-btn.component.css']
})
export class DeleteBtnComponent {
  
  constructor(private deleteService: EmployeeService){}
  onDeleteClicked(){
    this.deleteService.triggerDelete();
  }
}
