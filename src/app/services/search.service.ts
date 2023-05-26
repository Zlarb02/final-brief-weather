import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private variable$ = new BehaviorSubject<any>(null);
  
  constructor() {}

  saveCity(city: any) {
    this.variable$.next(city); // Émet une nouvelle valeur sur le Subject
  }

  loadCity() {
    return this.variable$.asObservable(); // Renvoie l'Observable du Subject
  }
}
