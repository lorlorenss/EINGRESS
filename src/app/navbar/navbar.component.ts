import { Component } from '@angular/core';3
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private router: Router){
  }

  logout(){
    const confirmation = confirm('Do you want to Logout?');

    if(confirmation){
      localStorage.removeItem('token');
      this.router.navigateByUrl('/login');
    }
  }
  
}
