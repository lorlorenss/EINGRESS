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
  selectedImage: File | null = null;
  photoSrc: string = "/assets/images/max-smith.png";

  // Using the Employee interface for form fields
  newEmployee: Employee = {
    id: 0,
    fullname: '',
    role: '', // Initialize role as an empty string
    regdate: new Date(), 
    lastlogdate: '',
    email: '',
    phone: ''
  };

  constructor(private employeeService: EmployeeService) { }

  showAddUserForm() {
    this.addUserForm = true;
  }

  hideAddUserForm() {
    this.addUserForm = false;
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      if (file.type === 'image/jpeg' || file.type === 'image/png') {
        this.selectedImage = file;

        // Update the image source for preview
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.photoSrc = reader.result as string;
        };
      } else {
        alert('Please select a valid image format (jpg, png).');
      }
    }
  }


  submitUser() {
    // Validate form data
    if (!this.newEmployee.fullname || !this.newEmployee.email || !this.newEmployee.phone || !this.newEmployee.role) {
      alert('Please fill in all fields.');
      return;
    }

    // Call service to add new employee
    this.employeeService.addEmployee(this.newEmployee)
      .subscribe(
        response => {
          console.log('Employee added successfully', response);

          // Update newEmployee with the returned ID
          this.newEmployee.id = response.id;

          alert('Employee created successfully! ID: ' + this.newEmployee.id);

          // Optionally, reset the form or navigate to another page
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


  
  resetForm() {
    this.newEmployee = {
      id: 0,
      fullname: '',
      role: '',
      regdate: new Date(),
      lastlogdate: new Date().toISOString(),
      email: '',
      phone: ''
    };
    this.photoSrc = "/assets/images/max-smith.png";
  }



  onRoleChange(event: any) {
    this.newEmployee.role = event.target.value;
  }

}
