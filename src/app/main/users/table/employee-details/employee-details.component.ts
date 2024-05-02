import { Component, Input, OnChanges, OnInit, Output, SimpleChanges, ElementRef, ViewChild } from '@angular/core';
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
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  
  employeeDetails!: Employee | undefined;
  selectedImage!: File ;
  photoSrc: string | ArrayBuffer | null = null;

  updateEmployeeForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private employeeService: EmployeeService)
  {
    this.updateEmployeeForm = this.formBuilder.group({
      fullname: [''],
      email: [''],
      role: [''],
      phone: [''],
      
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
      const updateEmployee: Employee = this.updateEmployeeForm.value;
      const file: File = this.selectedImage; // Assuming you have selectedFile defined in your component class
  
      if (!file) {
        // Handle error if no file is selected
        console.error('No file selected');
        return;
      }
  
      this.employeeService.updateEmployee(id, updateEmployee, file).subscribe(
        (response) => {
          alert('Employee update successful');
          console.log('Employee update successful', response);
          this.hideEmployeeDetails();
          this.employeeService.reloadPage();
        },
        (error) => {
          // Handle error
          console.error('Error updating employee', error);
        }
      );
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
