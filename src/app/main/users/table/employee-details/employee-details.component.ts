import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Employee } from 'src/app/interface/employee.interface';
import { EmployeeService } from 'src/app/services/employee.service';
import { EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnChanges {
  
  employeeDetails!: Employee | undefined;

  updateEmployeeForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private employeeService: EmployeeService)
  {
    this.updateEmployeeForm = this.formBuilder.group({
      fullname: [''],
      email: [''],
      role: [''],
      phone: ['']
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['employeeDetails'] && changes['employeeDetails'].currentValue){
      this.updateEmployeeForm.patchValue(changes['employeeDetails'].currentValue);
    }
  }

  updateEmployee(){
    const id = this.employeeDetails?.id;

    if(id){
      const updateEmployee: Employee = this.updateEmployeeForm.value;
      console.log(updateEmployee);
      this.employeeService.updateEmployee(id, updateEmployee).subscribe(
        (response) => {
          console.log('Employee update successfully', response);
        }
      )
    }
  }

  onRoleChange(event: Event){
    const target = event.target as HTMLInputElement;
    const roleValue = target.getAttribute('value');
    this.updateEmployeeForm.patchValue({ role: roleValue});
    console.log({ role: roleValue});
  }
  
  showEmployeeDetails(employee: Employee){
    this.updateEmployeeForm.setValue({
      fullname: employee.fullname,
      email: employee.email,
      role: employee.role,
      phone: employee.phone
    })
    this.employeeDetails = employee;
  }

  hideEmployeeDetails(){
    this.employeeDetails = undefined;
  }
}
