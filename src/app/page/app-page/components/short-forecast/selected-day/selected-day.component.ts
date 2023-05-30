import { Component, Input, SimpleChanges } from '@angular/core';
import { Location } from 'src/app/models/location';
import { Daily, Hourly, Weather } from 'src/app/models/weather';
import { SearchService } from 'src/app/services/search.service';
import { SiblingService } from 'src/app/services/sibling.service';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-selected-day',
  templateUrl: './selected-day.component.html',
  styleUrls: ['./selected-day.component.scss']
})
export class SelectedDayComponent {
  @Input() public currentLocation!: Location;
  @Input() public chosenLocation!: Location;
  @Input() public weather!: Weather;

  @Input() public dailyForecast!: Daily;
  @Input() public dates!: string[];
  @Input() public sevenWeather!: number[];
  @Input() public sevenWeatherDescriptions!: string[];
  @Input() public sevenWeatherIcons!: string[];
  @Input() public sevenWeatherTempMin!: number[];
  @Input() public sevenWeatherTempMax!: number[];
  @Input() public sevenWeatherApparentTempMin!: number[];
  @Input() public sevenWeatherApparentTempMax!: number[];
  @Input() public sevenWeatherPrecipitationProbabilityMean!: number[]

  @Input() public winddirection_10m!: number[];
  @Input() public windspeed_10m!: number[];

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

  public currentHourForecast!: any;
  public chosenPlace: any;

  public selectedHourForecast: any;


  public dayIndex!: number;
  public hourIndex!: number;
  public hourlyWeatherIconsNight!: string[];
  public hourlyWeatherIsDay!: number[];

  constructor(private weatherService: WeatherService, private searchService: SearchService, private siblingService: SiblingService) {
    this.setIndexs()
  }

  setIndexs() {
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
    this.searchService.getPlace().subscribe((osmObj) => {
      this.chosenPlace = osmObj;
      this.getDailyForecast();
      this.getHourlyForecast(this.dayIndex)
    });
    this.siblingService.getRefreshObservable().subscribe(() => {
      this.setIndexs()
      this.getHourlyForecast(this.dayIndex)
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['currentLocation'] || changes['hourIndex']) {
      this.setIndexs();
      this.getDailyForecast();
      this.getHourlyForecast(this.dayIndex);
    }
  }


  formatDate(date: string): string {
    const weekdays = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
    const months = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];

    const dateObj = new Date(date);
    const dayOfWeek = weekdays[dateObj.getDay()];
    const dayOfMonth = dateObj.getDate();
    const month = months[dateObj.getMonth()];

    return `${dayOfWeek} ${dayOfMonth} ${month}`;
  }

  getDailyForecast() {
    if (this.chosenPlace)
      this.weatherService.getWeatherForecast(this.chosenPlace.lat, this.chosenPlace.lon)
        .subscribe(
          (weather) => {
            this.dates = weather.daily.time;
            this.sevenWeatherTempMin = weather.daily.temperature_2m_min;
            this.sevenWeatherTempMax = weather.daily.temperature_2m_max;
            this.sevenWeatherApparentTempMin = weather.daily.apparent_temperature_min;
            this.sevenWeatherApparentTempMax = weather.daily.apparent_temperature_max;
            this.sevenWeatherPrecipitationProbabilityMean = weather.daily.precipitation_probability_mean;
            this.sevenWeatherDescriptions = weather.daily.weathercode.map(code => this.weatherService.getWeatherDescription(code));
            this.sevenWeatherIcons = weather.daily.weathercode.map(code => this.weatherService.getWeatherIcon(code));
            this.winddirection_10m = weather.daily.winddirection_10m_dominant;
            this.windspeed_10m = weather.daily.windspeed_10m_max;
            return this.dailyForecast = weather.daily;
          }
        );
    else if (this.currentLocation)
      this.weatherService.getWeatherForecast(this.currentLocation.lat, this.currentLocation.lon)
        .subscribe(
          (weather) => {
            this.dates = weather.daily.time;
            this.sevenWeatherTempMin = weather.daily.temperature_2m_min;
            this.sevenWeatherTempMax = weather.daily.temperature_2m_max;
            this.sevenWeatherApparentTempMin = weather.daily.apparent_temperature_min;
            this.sevenWeatherApparentTempMax = weather.daily.apparent_temperature_max;
            this.sevenWeatherPrecipitationProbabilityMean = weather.daily.precipitation_probability_mean;
            this.sevenWeatherDescriptions = weather.daily.weathercode.map(code => this.weatherService.getWeatherDescription(code));
            this.sevenWeatherIcons = weather.daily.weathercode.map(code => this.weatherService.getWeatherIcon(code));
            this.winddirection_10m = weather.daily.winddirection_10m_dominant;
            this.windspeed_10m = weather.daily.windspeed_10m_max;
            return this.dailyForecast = weather.daily;
          }
        );
  }

  getHourlyForecast(dayIndex: number) {
    const startIndex = dayIndex * 24;
    const endIndex = startIndex + 24;
    if (this.chosenPlace) {
      this.weatherService.getWeatherForecast(this.chosenPlace.lat, this.chosenPlace.lon)
        .subscribe(
          (weather) => {
            this.hourlyForecast = weather.hourly;
            this.hours = weather.hourly.time.slice(startIndex, endIndex).map(date => date.split('T')[1]);
            this.hourlyWeatherTemp = weather.hourly.temperature_2m.slice(startIndex, endIndex);
            this.hourlyWeatherApparentTemp = weather.hourly.apparent_temperature.slice(startIndex, endIndex);
            this.hourlyWeatherPrecipitationProbability = weather.hourly.precipitation_probability.slice(startIndex, endIndex);
            this.hourlyWeatherHumidity = weather.hourly.relativehumidity_2m.slice(startIndex, endIndex);
            this.hourlyWeatherDescriptions = weather.hourly.weathercode.slice(startIndex, endIndex).map(code => this.weatherService.getWeatherDescription(code));
            this.hourlyWeatherIsDay = this.hourlyForecast.is_day.slice(startIndex, endIndex);
            this.hourlyWeatherIcons = this.hourlyForecast.weathercode.slice(startIndex, endIndex).map(code => this.weatherService.getWeatherIcon(code));
            this.hourlyWeatherIconsNight = this.hourlyForecast.weathercode.slice(startIndex, endIndex).map(code => this.weatherService.getWeatherIconNight(code));
            this.winddirection_10m = weather.hourly.winddirection_10m.slice(startIndex, endIndex);
            this.windspeed_10m = weather.hourly.windspeed_10m.slice(startIndex, endIndex);

            this.selectedHourForecast = this.getSelectedHourForecast(this.hourIndex);
          }
        );
    } else if (this.currentLocation) {
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
            this.hourlyWeatherIsDay = this.hourlyForecast.is_day.slice(startIndex, endIndex);
            this.hourlyWeatherIcons = this.hourlyForecast.weathercode.slice(startIndex, endIndex).map(code => this.weatherService.getWeatherIcon(code));
            this.hourlyWeatherIconsNight = this.hourlyForecast.weathercode.slice(startIndex, endIndex).map(code => this.weatherService.getWeatherIconNight(code));
            this.winddirection_10m = weather.hourly.winddirection_10m.slice(startIndex, endIndex);
            this.windspeed_10m = weather.hourly.windspeed_10m.slice(startIndex, endIndex);

            this.selectedHourForecast = this.getSelectedHourForecast(this.hourIndex);
          }
        );
    }
  }


  getSelectedHourForecast(i: number) {
    const selectedHourForecast = {
      hour: this.hours[i],
      temperature: this.hourlyWeatherTemp[i],
      apparentTemperature: this.hourlyWeatherApparentTemp[i],
      precipitationProbability: this.hourlyWeatherPrecipitationProbability[i],
      humidity: this.hourlyWeatherHumidity[i],
      description: this.hourlyWeatherDescriptions[i],
      isDay: this.hourlyWeatherIsDay[i],
      icon: this.hourlyWeatherIcons[i],
      iconNight: this.hourlyWeatherIconsNight[i],
      windDirection: this.winddirection_10m[i],
      windSpeed: this.windspeed_10m[i]
    };
    return selectedHourForecast;
  }



}
