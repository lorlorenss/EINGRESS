import { Component, ViewChild, ElementRef } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/interface/employee.interface';

@Component({
  selector: 'app-add-user-form',
  templateUrl: './add-user-form.component.html',
  styleUrls: ['./add-user-form.component.css']
})
export class AddUserFormComponent {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  addUserForm: boolean = false;
  selectedImage!: File ;
  photoSrc: string | ArrayBuffer | null = null;

  // Using the Employee interface for form fields
  newEmployee = {
    id: 0,
    fullname: '',
    email: '',
    phone: '',
    role: '',
    profileImage: '' // Change the type to match the backend
  };

  constructor(private employeeService: EmployeeService) { }

  showAddUserForm() {
    this.addUserForm = true;
  }

  hideAddUserForm() {
    this.addUserForm = false;
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


  submitUser(): void {
    console.log('Form Data:', this.newEmployee);

    if (!this.newEmployee.fullname || !this.newEmployee.email || !this.newEmployee.phone || !this.newEmployee.role) {
      alert('Please fill in all fields.');
      return;
    }

    if (!this.selectedImage) {
      alert('Please select an image.');
      return;
    }
  
    // Call service to add new employee
    this.employeeService.addEmployee(this.newEmployee, this.selectedImage)
      .subscribe(
        response => {
          console.log('Employee added successfully', response);
          alert('Employee created successfully!');

          // Optionally reset the form
          // this.resetForm();
        },
        error => {
          console.error('Error adding employee', error);
          let errorMessage = 'Error adding employee. Please try again.';
  
          if (error.status === 400) {
            errorMessage = 'Bad request. Please check your input data.';
          } else if (error.status === 500) {
            errorMessage = 'Internal server error. Please try again later.';
          } else if (error.error && error.error.message) {
            errorMessage = error.error.message;
          }
  
          alert(errorMessage);
        }
      );
  }

  onRoleChange(event: any) {
    this.newEmployee.role = event.target.value;
  }

}
