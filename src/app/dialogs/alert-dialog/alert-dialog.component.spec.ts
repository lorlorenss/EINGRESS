import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog'; // Import MatDialogModule and MAT_DIALOG_DATA
import { AlertDialogComponent } from './alert-dialog.component';
import { AlertDialog } from 'src/app/interface/alert-dialog-interface'; // Adjust the path as necessary

describe('AlertDialogComponent', () => {
  let component: AlertDialogComponent;
  let fixture: ComponentFixture<AlertDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlertDialogComponent],
      imports: [MatDialogModule], // Import MatDialogModule
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { title: 'Test Title', message: 'Test Message' } as AlertDialog } // Provide a mock value for MAT_DIALOG_DATA
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
