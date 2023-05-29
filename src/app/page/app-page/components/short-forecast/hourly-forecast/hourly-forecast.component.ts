import { Component, Input, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Location as AngularLocation } from '@angular/common';
import { Location } from 'src/app/models/location';
import { Hourly, Weather } from 'src/app/models/weather';
import { SearchService } from 'src/app/services/search.service';
import { WeatherService } from 'src/app/services/weather.service';
import { SiblingService } from 'src/app/services/sibling.service';

@Component({
  selector: 'app-hourly-forecast',
  templateUrl: './hourly-forecast.component.html',
  styleUrls: ['./hourly-forecast.component.scss']
})
export class HourlyForecastComponent {
  @ViewChild('cardContainer', { static: false }) cardContainer!: ElementRef;

  @Input() public currentLocation!: Location;
  @Input() public chosenLocation!: Location;
  @Input() public weather!: Weather;

  public date: Date = new Date();
  public currentHour: number = Number(this.date.getHours().toString().padStart(2, '0'));

  public hourlyForecast!: Hourly;
  public hours!: string[];
  public hourlyWeather!: number[];
  public hourlyWeatherDescriptions!: string[];
  public hourlyWeatherIcons!: string[];
  public hourlyWeatherTemp!: number[];
  public hourlyWeatherApparentTemp!: number[];
  public hourlyWeatherPrecipitationProbability!: number[]
  public hourlyWeatherHumidity!: number[]

  public chosenPlace: any;

  @Input() public dayIndex!: number;
  @Input() public hourIndex!: number;

  public selectedHourForecast!: { hour: string; temperature: number; apparentTemperature: number; precipitationProbability: number; humidity: number; description: string; icon: string; };

  constructor(private weatherService: WeatherService, private searchService: SearchService, private router: Router, private route: ActivatedRoute, private location: AngularLocation, private siblingService: SiblingService) {
    const url = window.location.pathname;
    const segments = url.split('/');
    if (segments.length === 4) {
      this.hourIndex = Number(segments[segments.length - 1]);
      this.dayIndex = Number(segments[segments.length - 2]) - 1;
    } else if (segments.length === 3) {
      this.dayIndex = Number(segments[segments.length - 1]) - 1;
      this.hourIndex = this.currentHour;
    }
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getHourlyForecast(this.dayIndex);
    });

    this.searchService.getPlace().subscribe((osmObj) => {
      this.chosenPlace = osmObj;
      this.getHourlyForecast(this.dayIndex);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['currentLocation'] && changes['currentLocation'].currentValue) {
      this.getHourlyForecast(this.dayIndex);
    }
    if (changes['hourIndex'] && changes['hourIndex'].currentValue) {
      this.getHourlyForecast(this.dayIndex);
    }
  }

  scrollToCurrentHour() {
    if (this.cardContainer && this.cardContainer.nativeElement) {
      const currentHourCard = this.cardContainer.nativeElement.querySelector('.current-hour-card');
      if (currentHourCard) {
        console.log('to current')
        currentHourCard.scrollIntoView({ behavior: 'smooth', inline: 'start' });
      }
    }
  }

  scrollToSelectedHour() {
    if (this.cardContainer && this.cardContainer.nativeElement) {
      const selectedHourCard = this.cardContainer.nativeElement.querySelector('.selected-hour-card');
      if (selectedHourCard) {
        console.log('to selected')
        selectedHourCard.scrollIntoView({ behavior: 'smooth', inline: 'start' });
      }
    }
  }

  scrollTo10() {
    if (this.cardContainer && this.cardContainer.nativeElement) {

      console.log('to ten')
      const tenHourCard = this.cardContainer.nativeElement.querySelector('.ten-hour-card');
      if (tenHourCard) {
        tenHourCard.scrollIntoView({ behavior: 'smooth', inline: 'start' });
      }
    }
  }

  isCurrentHour(hour: string): boolean {
    let currentHourToCompare = `${this.currentHour}:00`;
    if (hour === `${currentHourToCompare}`) {
      return true
    }
    else
      return false
  }

  isSelectedHour(hour: string): boolean {
    if (Number(hour.split(':')[0]) == this.hourIndex) {
      return true
    }
    else {
      return false
    }
  }

  getHourlyForecast(dayIndex: number) {
    const startIndex = dayIndex * 24;
    const endIndex = startIndex + 24;
    if (this.chosenPlace)
      this.weatherService.getWeatherForecast(this.chosenPlace.lat, this.chosenPlace.lon)
        .subscribe(
          (weather) => {
            this.hourlyForecast = weather.hourly;
            this.hours = this.hourlyForecast.time.slice(startIndex, endIndex).map(date => date.split('T')[1]);
            this.hourlyWeatherTemp = this.hourlyForecast.temperature_2m.slice(startIndex, endIndex);
            this.hourlyWeatherApparentTemp = this.hourlyForecast.apparent_temperature.slice(startIndex, endIndex);
            this.hourlyWeatherPrecipitationProbability = this.hourlyForecast.precipitation_probability.slice(startIndex, endIndex);
            this.hourlyWeatherHumidity = this.hourlyForecast.relativehumidity_2m.slice(startIndex, endIndex);
            this.hourlyWeatherDescriptions = this.hourlyForecast.weathercode.slice(startIndex, endIndex).map(code => this.weatherService.getWeatherDescription(code));
            this.hourlyWeatherIcons = this.hourlyForecast.weathercode.slice(startIndex, endIndex).map(code => this.weatherService.getWeatherIcon(code));
            if (dayIndex === 0)
              setTimeout(() => {
                this.scrollToCurrentHour()
              }, 10);
            if (dayIndex !== 0)
              setTimeout(() => {
                this.scrollTo10()

              }, 10);
            this.selectedHourForecast = this.getSelectedHourForecast(this.hourIndex);
          }
        );
    else if (this.currentLocation)
      this.weatherService.getWeatherForecast(this.currentLocation.lat, this.currentLocation.lon)
        .subscribe(
          (weather) => {
            this.hourlyForecast = weather.hourly;
            this.hours = weather.hourly.time.slice(startIndex, endIndex).map(date => date.split('T')[1]);
            this.hourlyWeatherTemp = weather.hourly.temperature_2m.slice(startIndex, endIndex);
            this.hourlyWeatherApparentTemp = weather.hourly.apparent_temperature.slice(startIndex, endIndex);
            this.hourlyWeatherPrecipitationProbability = weather.hourly.precipitation_probability.slice(startIndex, endIndex);
            this.hourlyWeatherHumidity = weather.hourly.relativehumidity_2m.slice(startIndex, endIndex);
            this.hourlyWeatherDescriptions = weather.hourly.weathercode.slice(startIndex, endIndex).map(code => this.weatherService.getWeatherDescription(code));
            this.hourlyWeatherIcons = weather.hourly.weathercode.slice(startIndex, endIndex).map(code => this.weatherService.getWeatherIcon(code));
            if (dayIndex === 0)
              setTimeout(() => {
                this.scrollToCurrentHour()
              }, 10);
            if (dayIndex !== 0)
              setTimeout(() => {
                this.scrollTo10()
              }, 10);
            this.selectedHourForecast = this.getSelectedHourForecast(this.hourIndex);
          }
        );
  }

  getSelectedHourForecast(i: number) {
    const currentHourForecast = {
      hour: this.hours[i],
      temperature: this.hourlyWeatherTemp[i],
      apparentTemperature: this.hourlyWeatherApparentTemp[i],
      precipitationProbability: this.hourlyWeatherPrecipitationProbability[i],
      humidity: this.hourlyWeatherHumidity[i],
      description: this.hourlyWeatherDescriptions[i],
      icon: this.hourlyWeatherIcons[i]
    };
    return currentHourForecast;
  }

  navigateToHour(i: number, callCount: number = 0) {
    const currentUrl = this.router.url;
    const segments = currentUrl.split('/');

    if (segments[1] === 'homepage') {
      segments[1] = 'day';
      segments.splice(2, 0, '1');
    }

    if (segments.length === 4) {
      segments[3] = i.toString();
    } else {
      segments.push(i.toString());
    }

    const newUrl = segments.join('/');

    this.siblingService.refreshSibling();

    this.router.navigateByUrl(newUrl).then(() => {
      if (callCount < 1) {
        this.navigateToHour(i, callCount + 1);
      }
    });
  }
}
