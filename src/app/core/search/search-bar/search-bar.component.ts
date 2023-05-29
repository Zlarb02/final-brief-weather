import { Component, OnInit } from '@angular/core';
import { ChosenLocationService } from 'src/app/services/chosen-location.service';
import { CurrentLocationService } from 'src/app/services/current-location.service';
import { LocationImgService } from 'src/app/services/location-img.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  currentIndex: number = 0;
  locationInput!: string;
  locationFound!: any; // le nom de la ville qu'on va afficher sur la page
  photos: any;
  placeName: any;

  constructor(
    private chosenLocationService: ChosenLocationService,
    private currentLocationService: CurrentLocationService,
    private searchService: SearchService,
    private locationImgService: LocationImgService
  ) { }

  ngOnInit() {
    this.startSlideshow();
    this.searchService.getPlace().subscribe((osmObj) => {
      this.locationImgService.getImgFromLoc(osmObj.display_name).subscribe({
        next: (response: any) => {
          this.photos = response.results;
        }
      });
    });

  }


  onSubmit() {
    this.getPlaceName(this.locationInput);

  }

  getPlaceName(place: string) {
    this.chosenLocationService.getLatAndLonFromSearch(place).subscribe({
      next: (osmObj) => {
        this.locationFound = osmObj[0];
        console.log(this.locationFound)
        this.locationImgService.getImgFromLoc(this.locationFound.display_name).subscribe({
          next: (response: any) => {
            this.photos = response.results;
          }
        });
        this.searchService.setPlace(this.locationFound);
      }
    });
  }

  startSlideshow() {
    setInterval(() => {
      if (this.photos)
        this.currentIndex = (this.currentIndex + 1) % this.photos.length;
    }, 5000); // Changer le délai ici (en millisecondes) selon vos besoins
  }

}
