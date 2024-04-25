import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvalidUserDialogComponent } from './invalid-user-dialog.component';

describe('InvalidUserDialogComponent', () => {
  let component: InvalidUserDialogComponent;
  let fixture: ComponentFixture<InvalidUserDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvalidUserDialogComponent]
    });
    fixture = TestBed.createComponent(InvalidUserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
