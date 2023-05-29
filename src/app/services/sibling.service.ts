import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SiblingService {
  private refreshSubject = new BehaviorSubject<undefined>(undefined); // Utilise BehaviorSubject

  refreshSibling() {
    this.refreshSubject.next(undefined);
  }

  getRefreshObservable() {
    return this.refreshSubject.asObservable();
  }
}