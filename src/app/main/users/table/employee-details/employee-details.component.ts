import { Component, Input, OnChanges, OnInit, Output, SimpleChanges, ElementRef, ViewChild } from '@angular/core';
import { Employee } from 'src/app/interface/employee.interface';
import { EmployeeService } from 'src/app/services/employee.service';
import { EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService } from 'src/app/services/dialog.service';
import { Validator } from '@angular/forms';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnChanges {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  
  employeeDetails!: Employee | undefined;
  selectedImage!: File ;
  photoSrc: string | ArrayBuffer | null = null;

  updateEmployeeForm: FormGroup;
  isUpdating: boolean = false;
  
  constructor(private formBuilder: FormBuilder, private employeeService: EmployeeService, private dialogService: DialogService)
  {
    this.updateEmployeeForm = this.formBuilder.group({
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      phone: ['', Validators.required],
      
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['employeeDetails'] && changes['employeeDetails'].currentValue){
      this.updateEmployeeForm.patchValue(changes['employeeDetails'].currentValue);
    }
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      if (file.type === 'image/jpeg' || file.type === 'image/png') {
        this.selectedImage = file;
  
        // Update the image source for preview
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.photoSrc = reader.result;
        };
      } else {
        alert('Please select a valid image format (jpg, png).');
      }
    }
  }

  updateEmployee(): void {
    const id = this.employeeDetails?.id;
  
    if (id) {
      const emailControl = this.updateEmployeeForm.get('email');
      if(emailControl && emailControl.invalid){
        this.dialogService.openAlertDialog('Invalid email please try again');
        return
      }

      if(this.updateEmployeeForm.invalid){
        this.dialogService.openAlertDialog('Please fill in all credentials');
        return
      }

      const updateEmployee: Employee = this.updateEmployeeForm.value;
      const file: File = this.selectedImage; 

      this.isUpdating = true; // Set update flag
    
      if (file) {
        this.employeeService.updateEmployee(id, updateEmployee, file).subscribe(
          (response) => {
            this.dialogService.openSuccessDialog('Employee update successfully').subscribe(confirmed =>{
              if(confirmed){
                this.isUpdating = false; 
              }

            });

          },
          (error) => {
            this.dialogService.openAlertDialog('Error updating dialog');
            this.isUpdating = false; // Reset update flag
          }
        );
      } else {
        this.employeeService.updateEmployeeWithoutImage(id, updateEmployee).subscribe(
          (response) => {
            this.dialogService.openSuccessDialog('Employee update successfully').subscribe(confirmed =>{
              if(confirmed){
                console.log('Employee update successful', response);
                this.isUpdating = false; 
              }
            });

          },
          (error) => {
            this.dialogService.openAlertDialog('Error updating dialog');
            this.isUpdating = false;
          }
        );
      }
    }
  }
  
  onRoleChange(event: Event){
    const target = event.target as HTMLInputElement;
    const roleValue = target.getAttribute('value');
    this.updateEmployeeForm.patchValue({ role: roleValue});
    console.log({ role: roleValue});
  }
  
  showEmployeeDetails(employee: Employee){
    this.updateEmployeeForm.patchValue({
      fullname: employee.fullname,
      email: employee.email,
      role: employee.role,
      phone: employee.phone
    })
    this.employeeDetails = employee;
  }

  hideEmployeeDetails(){
    this.employeeDetails = undefined;
    this.employeeService.reloadPage();
  }
}
