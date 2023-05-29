import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationImgService {

  constructor(private http: HttpClient) { }

  getImgFromLoc(q: string) {
    const url = `https://api.unsplash.com/search/photos?query={${q}}&client_id=lp0WChyZl-mDw6uQ5O2RRXlw5pKnN409ObZdw54qIgw`
    return this.http.get(url);
  }
}
