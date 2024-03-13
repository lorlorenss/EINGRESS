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

  // submitCredentials() {

  //   console.log(this.form.value);

  //   this.userService.loginUser(this.form.value).subscribe( //Use Subscribe method to the Observable object
  //     (res: any) => {
  //       if(res && res.result){
  //         alert('Login Success')
  //         this.router.navigate(['/main']);
  //       }
  //       else{
  //         alert(res.message)
  //       }
        
  //     }
  //   );

  //   // this.userService.loginUser('mikei5', 'hashcode').subscribe(data => console.log('Successs'));
  // }

  submitCredentials() {
    console.log(this.form.value);
  
    this.userService.loginUser(this.form.value).subscribe(
      (res: any) => {
        if (res && res.result) {
          alert('Login Success');
          this.router.navigate(['/main']);
        } else if (res && res.message) {
          alert(res.message);
        }
        // } else {
        //   // Handle other cases where response is not as expected
        //   console.error('Unexpected response:', res);
        //   alert('Unexpected response from the server. Please try again later.');
        // }
      },
      (error) => {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
      }
    );
  }
  
}
