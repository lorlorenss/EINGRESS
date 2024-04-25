import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { InvalidUserDialogComponent } from './invalid-user-dialog/invalid-user-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private dialog: MatDialog
  ){
    this.form = this.formBuilder.group({
      username: ['',Validators.required],
      password: ['',Validators.required]
  });
  }

  submitCredentials() {
    if(this.form.invalid){
      return;
    }

    this.userService.loginUser(this.form.getRawValue()).subscribe({
        next: (response: any) => {
          localStorage.setItem('token', response.access_token);
          this.router.navigateByUrl('/main');
        },
        error: (error) => {
          console.error(error);
          this.openErrorDialog(); 
        }
      } 
    );
  }

  openErrorDialog(): void {
    this.dialog.open(InvalidUserDialogComponent, {
    });
  }

}

document.addEventListener("DOMContentLoaded", () => {
  const passwordField = document.querySelector<HTMLInputElement>('.password-container input[type="password"]');
  const showPasswordIcon = document.getElementById('show-icon') as HTMLImageElement;

  if (passwordField) {
      const initialPaddingRight = getComputedStyle(passwordField).paddingRight; // Get initial paddingRight
      const initialWidth = passwordField.offsetWidth + 'px'; // Get initial width

      showPasswordIcon.addEventListener('click', () => {
          // Toggle password visibility
          passwordField.type = passwordField.type === 'password' ? 'text' : 'password';
          // Change icon based on password visibility
          if (passwordField.type === 'password') {
              showPasswordIcon.src = '/assets/images/show-password.png'; // Image for hidden password
          } else {
              showPasswordIcon.src = '/assets/images/hide-password.png'; // Image for visible password
          }
          // Set input width and paddingRight to their initial values
          passwordField.style.width = initialWidth;
          passwordField.style.paddingRight = initialPaddingRight;
      });
  } else {
      console.error('Password input field not found.');
  }
});

