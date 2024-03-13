import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-selection',
  templateUrl: './user-selection.component.html',
  styleUrls: ['./user-selection.component.css']
})
export class UserSelectionComponent {
  @Input() isHeaderChecked: boolean = false; // Receive state of header checkbox
}
