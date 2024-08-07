import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from '../services/dialog.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isLocked = false;
  @Output() lockStateChange = new EventEmitter<boolean>();

  constructor(private router: Router, private dialogService: DialogService) {}

  toggleLock() {
    this.isLocked = !this.isLocked;
    this.lockStateChange.emit(this.isLocked);
    
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
