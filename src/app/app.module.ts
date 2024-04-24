import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { DashboardComponent } from './main/dashboard/dashboard.component';
import { ReportsComponent } from './main/reports/reports.component';
import { UsersComponent } from './main/users/users.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UserService } from './services/user.service';
import { SecuritySummaryComponent } from './main/dashboard/security-summary/security-summary.component';
import { SearchfieldComponent } from './main/users/searchfield/searchfield.component';
import { ImportBtnComponent } from './main/users/import-btn/import-btn.component';
import { AddUserBtnComponent } from './main/users/add-user-btn/add-user-btn.component';
import { DeleteBtnComponent } from './main/users/delete-btn/delete-btn.component';
import { CheckboxComponent } from './main/users/checkbox/checkbox.component';
import { TableComponent } from './main/users/table/table.component';
import { UserSelectionComponent } from './main/users/table/user-selection/user-selection.component';
import { AddUserFormComponent } from './main/users/add-user-form/add-user-form.component';
import { Table1Component } from './main/reports/table1/table1.component';
import { UserDetailsComponent } from './main/reports/user-details/user-details.component';
import { LoginSessionsComponent } from './main/reports/login-sessions/login-sessions.component';
import { ReportsSelectionComponent } from './main/reports/table1/reports-selection/reports-selection.component';
import { CustomInterceptor } from './services/custom.interceptor';
import { SessionComponent } from './main/reports/login-sessions/session/session.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EmployeeDetailsComponent } from './main/users/table/employee-details/employee-details.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    HeaderComponent,
    MainComponent,
    DashboardComponent,
    ReportsComponent,
    UsersComponent,
    SecuritySummaryComponent,
    SearchfieldComponent,
    ImportBtnComponent,
    AddUserBtnComponent,
    DeleteBtnComponent,
    CheckboxComponent,
    TableComponent,
    UserSelectionComponent,
    AddUserFormComponent,
    Table1Component,
    UserDetailsComponent,
    LoginSessionsComponent,
    ReportsSelectionComponent,
    SessionComponent,
    PageNotFoundComponent,
    EmployeeDetailsComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxChartsModule,
    BrowserAnimationsModule
  ],
  providers: [
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
