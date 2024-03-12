import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

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
    private http: HttpClient
  ){
    this.form = this.formBuilder.group({
      username: '',
      password: ''
  });
  }

  submitCredentials() {
    debugger;
    if(this.form.invalid){
      return;
    }

    console.log(this.form.value);

    this.userService.loginUser(this.form.value).subscribe( //Use Subscribe method to the Observable object
      () => {
        this.router.navigate(['/main']);
      }
    );
  }

}
