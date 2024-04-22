import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsSearchfieldComponent } from './reports-searchfield.component';

describe('ReportsSearchfieldComponent', () => {
  let component: ReportsSearchfieldComponent;
  let fixture: ComponentFixture<ReportsSearchfieldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportsSearchfieldComponent]
    });
    fixture = TestBed.createComponent(ReportsSearchfieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
