import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginSessionsComponent } from './login-sessions.component';

describe('LoginSessionsComponent', () => {
  let component: LoginSessionsComponent;
  let fixture: ComponentFixture<LoginSessionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginSessionsComponent]
    });
    fixture = TestBed.createComponent(LoginSessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
