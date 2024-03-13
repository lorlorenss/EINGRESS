import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  isHeaderChecked: boolean = false; // Track state of header checkbox

  @Output() headerCheckboxChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  toggleHeaderCheckbox(event: any) {
    this.isHeaderChecked = event.target.checked;
    this.headerCheckboxChange.emit(this.isHeaderChecked); // Emit event with new state
  }
}
