import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-import-btn',
  templateUrl: './import-btn.component.html',
  styleUrls: ['./import-btn.component.css']
})
export class ImportBtnComponent {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  constructor() { }

  importButtonClick() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    // Do something with the selected file
  }
}
