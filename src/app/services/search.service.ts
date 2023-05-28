import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private place$ = new BehaviorSubject<any>(null);

  constructor() { }

  setPlace(osmObj: any) {
    this.place$.next(osmObj); // Émet une nouvelle valeur sur le Subject
  }

  getPlace() {
    return this.place$.asObservable(); // Renvoie l'Observable du Subject
  }
}
