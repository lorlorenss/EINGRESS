import { Component } from '@angular/core';3
import { Router } from '@angular/router';
import { DialogService } from '../services/dialog.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private router: Router, private dialogService: DialogService){
  }

  logout() {
    this.dialogService.openConfirmDialog('Do you want to Logout?', 'No', 'Yes').subscribe(confirmed => {
      if (confirmed) {
        localStorage.removeItem('token');
        this.router.navigateByUrl('/login');
      }
    });
  }
  
}
