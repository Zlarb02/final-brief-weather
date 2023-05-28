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
  locationFound!: any; // le nom de la ville qu'on va afficher sur la page

  constructor(
    private chosenLocationService: ChosenLocationService,
    private searchService: SearchService
  ) { }

  ngOnInit(): void { }

  onSubmit() {
    this.getPlaceName(this.locationInput);
  }

  getPlaceName(place: string) {
    this.chosenLocationService.getLatAndLonFromSearch(place).subscribe({
      next: (osmObj) => {
        this.locationFound = osmObj[0];
        this.searchService.setPlace(this.locationFound);
      },
    });
  }
}
