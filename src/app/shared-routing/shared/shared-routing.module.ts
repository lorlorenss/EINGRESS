import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from 'src/app/main/main.component';
import { DashboardComponent } from 'src/app/main/dashboard/dashboard.component';
import { ReportsComponent } from 'src/app/main/reports/reports.component';
import { UsersComponent } from 'src/app/main/users/users.component';

const routes: Routes = [
  { path: 'main', 
  component: MainComponent,
  children: [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'reports', component: ReportsComponent},
    { path: 'users', component: UsersComponent},
    { path: '', redirectTo: 'dashboard', pathMatch: 'full'}
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
