import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Location } from '../models/location';

@Injectable({
  providedIn: 'root',
})
export class CurrentLocationService {

  
  getLatAndLonFromCityName(Location: string): Observable<Location[]> {
    // https://nominatim.openstreetmap.org/search.php?q=paris&format=jsonv2

    return this.http.get<Location[]>(
      'https://nominatim.openstreetmap.org/search.php?q=' +
        Location +
        '&format=jsonv2'
    );
  }
}
