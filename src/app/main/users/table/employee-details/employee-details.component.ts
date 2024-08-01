import { Component, Input, OnChanges, OnInit, Output, SimpleChanges, ElementRef, ViewChild } from '@angular/core';
import { Employee } from 'src/app/interface/employee.interface';
import { EmployeeService } from 'src/app/services/employee.service';
import { EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnChanges {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('rfidInput') rfidInput!: ElementRef<HTMLInputElement>;
  @ViewChild('fingerprintInput') fingerprintInput!: ElementRef<HTMLInputElement>;
  employeeDetails!: Employee | undefined;
  selectedImage!: File;
  photoSrc: string | ArrayBuffer | null = null;
  editMode: boolean = false;
  rfidScanMode: boolean = false;
  updateEmployeeForm: FormGroup;
  isUpdating: boolean = false;
  baseUrl = this.employeeService.apiUrl;

  constructor(private formBuilder: FormBuilder, private employeeService: EmployeeService, private dialogService: DialogService) {
    this.updateEmployeeForm = this.formBuilder.group({
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      profileImage: [''],
      phone: ['', Validators.required],
      rfidtag: ['', Validators.required],
      fingerprint: ['', Validators.required]
    });
    this.updateEmployeeForm.disable();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['employeeDetails'] && changes['employeeDetails'].currentValue) {
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

  updateEmployee(event: Event): void {
    event.preventDefault(); // Prevent the default form submission behavior
    const id = this.employeeDetails?.id;

    if (id) {
      const emailControl = this.updateEmployeeForm.get('email');

      if (this.updateEmployeeForm.invalid && emailControl?.value === '') {
        this.dialogService.openAlertDialog('Please fill in all credentials');
        return;
      }

      if (emailControl && emailControl.invalid) {
        this.dialogService.openAlertDialog('Invalid email please try again');
        return;
      }

      const updateEmployee: Employee = this.updateEmployeeForm.value;
      const file: File = this.selectedImage;

      this.isUpdating = true; // Set update flag

      if (file) {
        this.employeeService.updateEmployee(id, updateEmployee, file).subscribe(
          (response) => {
            this.dialogService.openSuccessDialog('Employee update successfully').subscribe(confirmed => {
              if (confirmed) {
                this.isUpdating = false;
                this.hideEmployeeDetails();
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
            this.dialogService.openSuccessDialog('Employee update successfully').subscribe(confirmed => {
              if (confirmed) {
                console.log('Employee update successful', response);
                this.isUpdating = false;
                this.hideEmployeeDetails();
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

  onClear(): void {
    Object.keys(this.updateEmployeeForm.controls).forEach(controlName => {
      const control = this.updateEmployeeForm.get(controlName);
      if (control instanceof FormControl) {
        control.setValue('');
      }
    });
  }

  enableEdit(): void {
    this.editMode = true;
    this.updateEmployeeForm.enable();
  }

  onRoleChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const roleValue = target.getAttribute('value');
    this.updateEmployeeForm.patchValue({ role: roleValue });
    console.log({ role: roleValue });
  }

  showEmployeeDetails(employee: Employee): void {
    this.updateEmployeeForm.patchValue({
      fullname: employee.fullname,
      email: employee.email,
      role: employee.role,
      phone: employee.phone,
      rfidtag: employee.rfidtag,
      fingerprint: employee.fingerprint
    });
    this.employeeDetails = employee;
  }

  hideEmployeeDetails(): void {
    this.employeeDetails = undefined;
    this.employeeService.reloadPage();
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

  preventDefault(event: Event): void {
    if ((event as KeyboardEvent).key === 'Enter') {
      event.preventDefault();
    }
  }
  
  

  
}
