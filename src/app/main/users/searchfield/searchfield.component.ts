import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-searchfield',
  templateUrl: './searchfield.component.html',
  styleUrls: ['./searchfield.component.css']
})
export class SearchfieldComponent {
  isFocused: boolean = false;
  searchTerm: string = '';
  
  @Output() searchChanged = new EventEmitter<string>();

  constructor() { }

  onInputChange() {
    this.searchChanged.emit(this.searchTerm);
  }

  toggleActive() {
    this.isFocused = !this.isFocused;
  }
}
