import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-searchfield',
  templateUrl: './searchfield.component.html',
  styleUrls: ['./searchfield.component.css']
})
export class SearchfieldComponent {

  @ViewChild('searchInput') searchInput!: ElementRef;

  searchEmployee: string = ''
  isFocused: boolean = false;

  constructor(private searchUserService: EmployeeService) { }

  onSearchUserClicked(){
    this.searchEmployee = this.searchInput.nativeElement.value;
    this.searchUserService.triggerSearchUser(this.searchEmployee);
  }

  onInputBlur(){
    if(!this.searchEmployee.trim()){
      this.searchUserService.triggerSearchUser('');
    }
  }

  toggleActive() {
    this.isFocused = !this.isFocused;
  }
}
