import { Component, OnInit } from '@angular/core';
import { ChosenLocationService } from 'src/app/services/chosen-location.service';
import { CurrentLocationService } from 'src/app/services/current-location.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  locationInput!: string;
  myCity!: any; // le nom de la ville qu'on va afficher sur la page

  constructor(
    private chosenLocationService: ChosenLocationService,
    private searchService: SearchService
  ) { }

  ngOnInit(): void { }

  onSubmit() {
    this.getCityName(this.locationInput);
  }

  getCityName(city: string) {
    this.chosenLocationService.getLatAndLonFromSearch(city).subscribe({
      next: (data) => {
        this.myCity = data[0];
        this.searchService.saveCity(this.myCity);
      },
    });
  }
}
