import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Employee } from 'src/app/interface/employee.interface';
import { EmployeeService } from 'src/app/services/employee.service';
import { startWith, switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { DialogService } from 'src/app/services/dialog.service';

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
  private reloadSubscription: Subscription = new Subscription();

  @Output() employeeSelected = new EventEmitter<any>();

  constructor(private employeeService: EmployeeService, private dialogService: DialogService) {}

  ngOnInit() {
    this.loadEmployeeInfo();

    this.employeeService.deletedClicked$.subscribe(() => {
      this.deleteEmployee();
    });

    this.reloadSubscription = this.employeeService.reload$.subscribe(() => {
      this.loadEmployeeInfo(); // Refresh employee info when reload is triggered
    });
  }

  ngOnDestroy() {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
    this.reloadSubscription.unsubscribe();
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

  deleteEmployee() {
    const selectedEmployee = this.employees.filter(employee => employee.selected).map(employee => employee.id);
    if (selectedEmployee.length > 0) {
      this.dialogService.openConfirmDialog('Do you want to Delete this user/s?', 'Cancel', 'Confirm').subscribe(confirmed => {
        if (confirmed) {
          this.employeeService.deleteEmployee(selectedEmployee).subscribe(() => {
            this.loadEmployeeInfo(); // Refresh employee info after deletion
          });
        }
      });
    }
  }

  selectedEmployee(employee: Employee) {
    this.employeeSelected.emit(employee);
  }
}
