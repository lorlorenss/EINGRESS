import { Component } from '@angular/core';

@Component({
  selector: 'app-searchfield',
  templateUrl: './searchfield.component.html',
  styleUrls: ['./searchfield.component.css']
})
export class SearchfieldComponent {
  isFocused: boolean = false;

  constructor() { }

  toggleActive() {
    this.isFocused = !this.isFocused;
  }
}
