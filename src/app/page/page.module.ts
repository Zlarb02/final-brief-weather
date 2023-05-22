import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentDayComponent } from './short-forecast/current-day/current-day.component';
import { ShortForecastModule } from './short-forecast/short-forecast.module';
import { LongForecastModule } from './long-forecast/long-forecast.module';



@NgModule({
  declarations: [],
  imports: [CommonModule, ShortForecastModule, LongForecastModule],
  exports: [CurrentDayComponent],
})
export class PageModule {}
