import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../interface/user.interface';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent{

  private user: User[] = [];
  isNavbarLocked: boolean = false;

  constructor (
    private userService: UserService
  ){
  }

  ngOnInit(): void {
    //this.loadUser();
  }

  loadUser(){
    this.userService.getUser().subscribe((response: any) =>{
      this.user = response.data;
    })
  }
  onLockStateChange(isLocked: boolean) {
    this.isNavbarLocked = isLocked;
  }
}
