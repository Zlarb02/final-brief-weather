import { Component } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  cityName: string ;
  
  searchCity() {

    console.log('Ville recherchée :', this.cityName);
  }

}
