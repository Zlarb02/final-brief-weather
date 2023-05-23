import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrentLocationService {

  constructor(private http: HttpClient) { }

  getCurrentLocationFromBrowser() {
    if (navigator.geolocation) {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat: number = position.coords.latitude;
            const lon: number = position.coords.longitude;
            resolve(this.getCurrentLocation(lat, lon));
          },
          (error) => {
            reject('Erreur lors de la récupération de la position: ' + error.message);
          }
        );
      });
    } else {
      return Promise.reject('La géolocalisation n\'est pas prise en charge par ce navigateur.');
    }
  }

  private getCurrentLocation(lat: number, lon: number) {
    const url = `current_location_api_endpoint?lat=${lat}&lon=${lon}&format=json`;

    return this.http.get(url);
  }
}
