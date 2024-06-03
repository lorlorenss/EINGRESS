import { Component, ViewChild, ElementRef } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-add-user-form',
  templateUrl: './add-user-form.component.html',
  styleUrls: ['./add-user-form.component.css']
})
export class AddUserFormComponent {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('rfidInput') rfidInput!: ElementRef<HTMLInputElement>;
  @ViewChild('fingerprintInput') fingerprintInput!: ElementRef<HTMLInputElement>;
  @ViewChild('employeeRole', {static: false}) employeeRole?: ElementRef;

  addUserForm: boolean = false;
  selectedImage!: File;
  photoSrc: string | ArrayBuffer | null = null;
  editMode: boolean = true; // Assuming edit mode is true to enable the "Begin scan" functionality

  // Using the Employee interface for form fields
  newEmployee = {
    id: 0,
    fullname: '',
    email: '',
    phone: '',
    role: '',
    rfidtag: '',
    profileImage: '' // Change the type to match the backend
  };

  constructor(private employeeService: EmployeeService, private dialogService: DialogService) { }

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
    this.newEmployee.role = this.employeeRole?.nativeElement.value;
    console.log(this.newEmployee.role);
    console.log('Form Data:', this.newEmployee);

    if (!this.newEmployee.fullname || !this.newEmployee.email || !this.newEmployee.phone || !this.newEmployee.role) {
      this.dialogService.openAlertDialog('Please fill in all credentials');
      return;
    }

    if (!this.selectedImage) {
      // Call service to add new employee without image
      this.employeeService.addEmployeeWithoutImage(this.newEmployee)
        .subscribe(
          response => {
            this.dialogService.openSuccessDialog('Employee Created Successfully').subscribe(confirmed => {
              if (confirmed) {
                this.employeeService.reloadPage();
              }
            });
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
    } else {
      // Call service to add new employee with uploaded image
      this.employeeService.addEmployee(this.newEmployee, this.selectedImage)
        .subscribe(
          response => {
            this.dialogService.openSuccessDialog('Employee Created Successfully').subscribe(confirmed => {
              if (confirmed) {
                this.employeeService.reloadPage();
              }
            });
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
  }

  startRFIDScan(): void {
    if (this.editMode) {
      this.rfidInput.nativeElement.removeAttribute('disabled');
      this.rfidInput.nativeElement.focus();
    }
  }

  startFingerprintScan(): void {
    if (this.editMode) {
      this.fingerprintInput.nativeElement.removeAttribute('disabled');
      this.fingerprintInput.nativeElement.focus();
    }
  }
}
