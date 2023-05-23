import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentDayComponent } from './short-forecast/current-day/current-day.component';
import { ShortForecastModule } from './short-forecast/short-forecast.module';
import { LongForecastModule } from './long-forecast/long-forecast.module';
import { SevenDaysComponent } from './long-forecast/seven-days/seven-days.component';



@NgModule({
  declarations: [],
  imports: [CommonModule, ShortForecastModule, LongForecastModule],
  exports: [CurrentDayComponent, SevenDaysComponent],
})
export class PageModule { }
