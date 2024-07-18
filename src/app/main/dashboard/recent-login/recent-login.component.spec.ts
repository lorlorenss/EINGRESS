import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentLoginComponent } from './recent-login.component';

describe('RecentLoginComponent', () => {
  let component: RecentLoginComponent;
  let fixture: ComponentFixture<RecentLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecentLoginComponent]
    });
    fixture = TestBed.createComponent(RecentLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
