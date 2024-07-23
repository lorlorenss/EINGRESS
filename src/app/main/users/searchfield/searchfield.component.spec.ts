import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchfieldComponent } from './searchfield.component';

describe('SearchfieldComponent', () => {
  let component: SearchfieldComponent;
  let fixture: ComponentFixture<SearchfieldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchfieldComponent]
    });
    fixture = TestBed.createComponent(SearchfieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
