// user-interaction.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserInteractionService {
  private isAddUserFormVisibleSubject = new BehaviorSubject<boolean>(false);

  toggleAddUserFormVisibility(visible: boolean): void {
    this.isAddUserFormVisibleSubject.next(visible);
  }

  get isAddUserFormVisible$(): Observable<boolean> {
    return this.isAddUserFormVisibleSubject.asObservable();
  }
}
