import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-reports-searchfield',
  templateUrl: './reports-searchfield.component.html',
  styleUrls: ['./reports-searchfield.component.css']
})
export class ReportsSearchfieldComponent {
  isFocused: boolean = false;
  searchTerm: string = '';
  
  @Output() searchChanged = new EventEmitter<string>();

  constructor() { }

  toggleActive() {
    this.isFocused = !this.isFocused;
  }

  onSearchChange(event: any) {
    this.searchTerm = event.target.value;
    this.searchChanged.emit(this.searchTerm);
  }
}
