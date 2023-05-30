import { Component, OnInit } from '@angular/core';
import { ChosenLocationService } from 'src/app/services/chosen-location.service';
import { LocationImgService } from 'src/app/services/location-img.service';
import { SearchService } from 'src/app/services/search.service';
import toastr from 'toastr';

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
  imgSearch: any;

  constructor(
    private chosenLocationService: ChosenLocationService,
    private searchService: SearchService,
    private locationImgService: LocationImgService,
  ) { }

  ngOnInit() {
    this.startSlideshow();

    this.searchService.getPlace().subscribe((osmObj) => {
      if (osmObj)
        this.locationFound = osmObj;
      if (this.locationFound) {
        this.imgSearch = this.locationFound.display_name.split(',')
        if (this.imgSearch[0] !== this.imgSearch[this.imgSearch.length - 1])
          this.locationImgService.getImgFromLoc(
            `${this.imgSearch[0]}, ${this.imgSearch[this.imgSearch.length]}`
          ).subscribe({
            next: (response: any) => {
              this.photos = response.results;
            }
          });
        else
          this.locationImgService.getImgFromLoc(
            `${this.imgSearch[0]}`
          ).subscribe({
            next: (response: any) => {
              this.photos = response.results;
            }
          });
      }

    });

  }


  onSubmit() {
    this.getPlaceName(this.locationInput);

  }

  getPlaceName(place: string) {
    this.chosenLocationService.getLatAndLonFromSearch(place).subscribe({
      next: (osmObj) => {
        this.locationFound = osmObj[0];
        if (this.locationFound) {
          this.imgSearch = this.locationFound.display_name.split(',')
          if (this.imgSearch[0] !== this.imgSearch[this.imgSearch.length - 1])
            this.locationImgService.getImgFromLoc(
              `${this.imgSearch[0]}, ${this.imgSearch[this.imgSearch.length]}`
            ).subscribe({
              next: (response: any) => {
                this.photos = response.results;
              }
            });
          else
            this.locationImgService.getImgFromLoc(
              `${this.imgSearch[0]}`
            ).subscribe({
              next: (response: any) => {
                this.photos = response.results;
              }
            });
        }
        else {
          this.locationImgService.getImgFromLoc(
            `backroom`
          ).subscribe({
            next: (response: any) => {
              this.photos = response.results;
            }
          });
          toastr.error('Aucun lieu trouvé', 'Recherche', {
            closeButton: true,
            progressBar: false,
            timeOut: 3000,
            extendedTimeOut: 7000,
            tapToDismiss: false,
            toastClass: 'toast place-not-found'
          });
        }
        this.searchService.setPlace(this.locationFound);
      }
    });
  }

  startSlideshow() {
    setInterval(() => {
      if (this.photos)
        this.currentIndex = (this.currentIndex + 1) % this.photos.length;
    }, 5000);
  }

  placeholderText: string = "Chercher Lieu (Ville, Pays...)";

  removePlaceholder() {
    this.placeholderText = "";
  }

  restorePlaceholder() {
    this.placeholderText = "Chercher Lieu (Ville, Pays...)";
  }
}
