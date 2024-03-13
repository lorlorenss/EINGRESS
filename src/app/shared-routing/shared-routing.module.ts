import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../main/dashboard/dashboard.component';
import { ReportsComponent } from '../main/reports/reports.component';
import { UsersComponent } from '../main/users/users.component';
import { MainComponent } from '../main/main.component';

const routes: Routes = [
  { 
    path: '', 
    component: MainComponent, 
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'reports', component: ReportsComponent },
      { path: 'users', component: UsersComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' } // Redirect to dashboard by default
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
