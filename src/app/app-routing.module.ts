import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { DashboardComponent } from './main/dashboard/dashboard.component';
import { ReportsComponent } from './main/reports/reports.component';
import { UsersComponent } from './main/users/users.component';
import { AddUserFormComponent } from './main/users/add-user-btn/add-user-form/add-user-form.component';

const routes: Routes = [

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
