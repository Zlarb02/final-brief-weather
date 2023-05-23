import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Location } from '../models/location';

@Injectable({
  providedIn: 'root'
})
export class CurrentLocationService {

  constructor(private http: HttpClient) { }

  getCurrentLocationFromBrowser(): Observable<Location> {
    return new Observable((observer) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat: number = position.coords.latitude;
            const lon: number = position.coords.longitude;
            this.getCurrentLocation(lat, lon)
              .subscribe(
                (location) => {
                  observer.next(location);
                  observer.complete();
                },
                (error) => {
                  observer.error('Erreur lors de la récupération de la position: ' + error.message);
                }
              );
          },
          (error) => {
            observer.error('Erreur lors de la récupération de la position: ' + error.message);
          }
        );
      } else {
        observer.error('La géolocalisation n\'est pas prise en charge par ce navigateur.');
      }
    });
  }

  private getCurrentLocation(lat: number, lon: number): Observable<Location> {
    const url = `current_location_api_endpoint?lat=${lat}&lon=${lon}&format=json`;
    return this.http.get<Location>(url).pipe(
      catchError((error) => {
        return throwError('Erreur lors de la récupération de la localisation: ' + error.message);
      })
    );
  }
}
