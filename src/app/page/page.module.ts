import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppPageComponent } from './app-page/app-page.component';
import { ShortForecastModule } from './app-page/components/short-forecast/short-forecast.module';
import { LongForecastModule } from './app-page/components/long-forecast/long-forecast.module';
import { SevenDaysComponent } from './app-page/components/long-forecast/seven-days/seven-days.component';
import { CurrentDayComponent } from './app-page/components/short-forecast/current-day/current-day.component';
import { AppRoutingModule } from '../app-routing.module';
import { PageRoutingModule } from './page-routing.module';



@NgModule({
  declarations: [
    AppPageComponent
  ],
  imports: [CommonModule, ShortForecastModule, LongForecastModule, PageRoutingModule, AppRoutingModule],
  exports: [CurrentDayComponent, SevenDaysComponent, AppPageComponent],
})
export class PageModule { }
