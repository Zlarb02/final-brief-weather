import { Component, Input, SimpleChanges } from '@angular/core';
import { Location } from 'src/app/models/location';
import { Daily, Hourly, Weather } from 'src/app/models/weather';
import { SearchService } from 'src/app/services/search.service';
import { SiblingService } from 'src/app/services/sibling.service';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-current-day',
  templateUrl: './current-day.component.html',
  styleUrls: ['./current-day.component.scss'],
})
export class CurrentDayComponent {
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

  public hourlyForecast!: Hourly;
  public hours!: string[];
  public hourlyWeather!: number[];
  public hourlyWeatherDescriptions!: string[];
  public hourlyWeatherIcons!: string[];
  public hourlyWeatherTemp!: number[];
  public hourlyWeatherApparentTemp!: number[];
  public hourlyWeatherPrecipitationProbability!: number[]
  public hourlyWeatherHumidity!: number[]

  public currentHourForecast!: { hour: string; temperature: number; apparentTemperature: number; precipitationProbability: number; humidity: number; description: string; isDay: number; icon: string; iconNight: string; windSpeed: number; windDirection: number; } | null;

  public date: Date = new Date();
  public currentHour: number = Number(this.date.getHours().toString().padStart(2, '0'));

  public dayIndex!: number;
  public hourIndex!: number;

  public chosenPlace: any;

  public hourlyWeatherIsDay!: number[];
  public hourlyWeatherIconsNight!: string[];
  public displayNameChosenPlace: any;

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
      if (this.chosenPlace)
        this.displayNameChosenPlace = this.chosenPlace.display_name.split(',')
          .map((item: string) => item.trim())
          .filter((_: any, index: number, array: string | any[]) => index === 0 || index === 1 || index === array.length - 2 || index === array.length - 1)
          .join(', ');
      this.getDailyForecast();
      this.getHourlyForecast(this.dayIndex);
    });
    this.siblingService.getRefreshObservable().subscribe(() => {
      this.setIndexs()
      this.getHourlyForecast(this.dayIndex)
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['currentLocation'] && changes['currentLocation'].currentValue) {
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
    if (this.chosenPlace)
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
            this.currentHourForecast = this.getCurrentHourForecast();
            this.currentHourForecast = this.getSelectedHourForecast(this.hourIndex);
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
            this.hourlyWeatherIsDay = this.hourlyForecast.is_day.slice(startIndex, endIndex);
            this.hourlyWeatherIcons = this.hourlyForecast.weathercode.slice(startIndex, endIndex).map(code => this.weatherService.getWeatherIcon(code));
            this.hourlyWeatherIconsNight = this.hourlyForecast.weathercode.slice(startIndex, endIndex).map(code => this.weatherService.getWeatherIconNight(code));
            this.winddirection_10m = weather.hourly.winddirection_10m.slice(startIndex, endIndex);
            this.windspeed_10m = weather.hourly.windspeed_10m.slice(startIndex, endIndex);
            this.currentHourForecast = this.getCurrentHourForecast();
            this.currentHourForecast = this.getSelectedHourForecast(this.hourIndex);
          }
        );
  }


  getCurrentHourForecast() {
    let currentHourIndex = -1
    if (this.currentLocation)
      currentHourIndex = this.hours.findIndex(hour => hour === `${this.currentHour}:00`);
    if (currentHourIndex !== -1) {
      const currentHourForecast = {
        hour: this.hours[currentHourIndex],
        temperature: this.hourlyWeatherTemp[currentHourIndex],
        apparentTemperature: this.hourlyWeatherApparentTemp[currentHourIndex],
        precipitationProbability: this.hourlyWeatherPrecipitationProbability[currentHourIndex],
        humidity: this.hourlyWeatherHumidity[currentHourIndex],
        description: this.hourlyWeatherDescriptions[currentHourIndex],
        isDay: this.hourlyWeatherIsDay[currentHourIndex],
        icon: this.hourlyWeatherIcons[currentHourIndex],
        iconNight: this.hourlyWeatherIconsNight[currentHourIndex],
        windDirection: this.winddirection_10m[currentHourIndex],
        windSpeed: this.windspeed_10m[currentHourIndex]
      };
      return currentHourForecast;
    } else {
      return null;
    }
  }

  getSelectedHourForecast(i: number) {
    const currentHourForecast = {
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
    return currentHourForecast;
  }

  getWindDirection(degrees: number): string {
    if (degrees >= 348.75 || degrees < 11.25) {
      return 'Nord';
    } else if (degrees >= 11.25 && degrees < 33.75) {
      return 'Nord-Nord-Est';
    } else if (degrees >= 33.75 && degrees < 56.25) {
      return 'Nord-Est';
    } else if (degrees >= 56.25 && degrees < 78.75) {
      return 'Est-Nord-Est';
    } else if (degrees >= 78.75 && degrees < 101.25) {
      return 'Est';
    } else if (degrees >= 101.25 && degrees < 123.75) {
      return 'Est-Sud-Est';
    } else if (degrees >= 123.75 && degrees < 146.25) {
      return 'Sud-Est';
    } else if (degrees >= 146.25 && degrees < 168.75) {
      return 'Sud-Sud-Est';
    } else if (degrees >= 168.75 && degrees < 191.25) {
      return 'Sud';
    } else if (degrees >= 191.25 && degrees < 213.75) {
      return 'Sud-Sud-Ouest';
    } else if (degrees >= 213.75 && degrees < 236.25) {
      return 'Sud-Ouest';
    } else if (degrees >= 236.25 && degrees < 258.75) {
      return 'Ouest-Sud-Ouest';
    } else if (degrees >= 258.75 && degrees < 281.25) {
      return 'Ouest';
    } else if (degrees >= 281.25 && degrees < 303.75) {
      return 'Ouest-Nord-Ouest';
    } else if (degrees >= 303.75 && degrees < 326.25) {
      return 'Nord-Ouest';
    } else {
      return 'Nord-Nord-Ouest';
    }
  }

}
