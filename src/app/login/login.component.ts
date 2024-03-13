import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../services/user.service';
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
      username: ['', Validators.required],
      password: ['', Validators.required]
  });
  }

  submitCredentials() {
    debugger;
    this.userService.loginUser(this.form.getRawValue()).subscribe( //Use Subscribe method to the Observable object
      (response: any) => {
        if(response.success){
          alert('Login Success');
          localStorage.setItem('token', response.data.accessToken);
          this.router.navigateByUrl('/main');
        }
        else{
          alert(response.message)
        }
        
      }
    );
  }

}
