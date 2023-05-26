import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Location } from '../models/location';

@Injectable({
  providedIn: 'root',
})
export class ChosenLocationService {
  constructor(private http: HttpClient) {}

  getLatAndLonFromSearch(q: string): Observable<Location[]> {
    const url = `search_location_api_endpoint.php?q=${q}&format=jsonv2`;
    const latAndLon = this.http.get<Location[]>(url);
    return new Observable((observer) => {
    latAndLon.subscribe(       
      (location) => {
        // console.log(location[0].lon);
        // console.log(location[0].lat);
        
                observer.next(location);
                observer.complete();
      });
    });
    
    return  latAndLon;
  }
/* 
  getChosenLocation(lat: number, lon: number): Observable<Location> {
    const url = `current_location_api_endpoint?lat=${lat}&lon=${lon}&format=json`;

    console.log('url :', url);

    return this.http.get<Location>(url).pipe(
      catchError((error) => {
        return throwError(
          'Erreur lors de la récupération de la localisation: ' + error.message
        );
      })
    );
  } */
} 