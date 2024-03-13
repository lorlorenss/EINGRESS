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

import { HttpClientModule } from '@angular/common/http';
import { UserService } from './user.service';
import { SecuritySummaryComponent } from './main/dashboard/security-summary/security-summary.component';
import { SearchfieldComponent } from './main/users/searchfield/searchfield.component';
import { ImportBtnComponent } from './main/users/import-btn/import-btn.component';
import { AddUserBtnComponent } from './main/users/add-user-btn/add-user-btn.component';
import { DeleteBtnComponent } from './main/users/delete-btn/delete-btn.component';
import { CheckboxComponent } from './main/users/checkbox/checkbox.component';
import { TableComponent } from './main/users/table/table.component';
import { UserSelectionComponent } from './main/users/table/user-selection/user-selection.component';
=======
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UserService } from './services/user.service';
import { SharedRoutingModule } from './shared-routing/shared-routing.module';
import { CustomInterceptor } from './services/custom.interceptor';



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

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedRoutingModule
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
