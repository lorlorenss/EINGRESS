import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Employee } from 'src/app/interface/employee.interface';
import { EmployeeService } from 'src/app/services/employee.service';
import { startWith, switchMap } from 'rxjs/operators';
import { Subscription, of } from 'rxjs';
import { DialogService } from 'src/app/services/dialog.service';
import { environment } from 'src/app/environments/environment.prod';

@Component({
  selector: 'app-user-selection',
  templateUrl: './user-selection.component.html',
  styleUrls: ['./user-selection.component.css']
})
export class UserSelectionComponent implements OnInit, OnDestroy {
  baseUrl = this.employeeService.apiUrl;
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  searchSubscription: Subscription | undefined;
  selectAll: boolean = false;

  @Output() employeeSelected = new EventEmitter<any>();

  constructor(private employeeService: EmployeeService, private dialogService: DialogService) {}

  ngOnInit() {
    this.loadEmployeeInfo();
    this.employeeService.deletedClicked$.subscribe(() => {
      this.deleteEmployee();
    });
  }

  ngOnDestroy() {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  loadEmployeeInfo() {
    this.searchSubscription = this.employeeService.searchUserTrigger$.pipe(
      startWith(''),
      switchMap(searchInputValue => {
        if (!searchInputValue.trim()) {
          return this.employeeService.getEmployee();
        } else {
          return this.employeeService.searchEmployee(searchInputValue);
        }
      })
    ).subscribe(employees => {
      this.employees = employees;
      this.filteredEmployees = [...this.employees];
    });
  }

  toggleAllSelection(event: any): void {
    const isChecked = event.target.checked;
    this.filteredEmployees.forEach(employee => {
      employee.selected = isChecked;
    });
  }

  toggleSelection(employee: Employee): void {
    employee.selected = !employee.selected;
    this.updateSelectAll();
  }

  updateSelectAll() {
    this.selectAll = this.filteredEmployees.every(employee => employee.selected);
  }

  deleteEmployee() {
    const selectedEmployees = this.employees.filter(employee => employee.selected).map(employee => employee.id);
    if (selectedEmployees.length > 0) {
      this.dialogService.openConfirmDialog('Do you want to Delete this user/s?', 'Cancel', 'Confirm').subscribe(confirmed => {
        if (confirmed) {
          this.employeeService.deleteEmployee(selectedEmployees).subscribe(() => {
            this.loadEmployeeInfo();
          });
        }
      });
    }
  }

  selectedEmployee(employee: Employee) {
    this.employeeSelected.emit(employee);
  }
}
