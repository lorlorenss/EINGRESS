import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';

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
    private userService: UserService
  ){
    this.form = this.formBuilder.group({
      email: ['',Validators.required],
      password: ['',Validators.required]
  });
  }

  submitCredentials() {
    if(this.form.invalid){
      return;
    }

    this.userService.loginUser(this.form.value).subscribe( //Use Subscribe method to the Observable object
      () => {
        this.router.navigate(['/main']);
      }
    );
  }

}
