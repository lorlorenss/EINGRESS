import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-searchfield',
  templateUrl: './searchfield.component.html',
  styleUrls: ['./searchfield.component.css']
})
export class SearchfieldComponent {

  @ViewChild('searchInput') searchInput!: ElementRef;
  searchEmployee: string = ''
  isFocused: boolean = false;
  private reloadSubscription: Subscription = new Subscription();

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.reloadSubscription = this.employeeService.reload$.subscribe(() => {
      this.searchInput.nativeElement.value = "";
    });
  }

  onSearchUserInputChanged(){
    this.searchEmployee = this.searchInput.nativeElement.value;
    this.employeeService.triggerSearchUser(this.searchEmployee);
  }

  onInputBlur(){
    if(!this.searchEmployee.trim()){
      this.employeeService.triggerSearchUser('');
    }
  }

  toggleActive() {
    this.isFocused = !this.isFocused;
  }
}
