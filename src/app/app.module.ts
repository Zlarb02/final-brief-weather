import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { PageModule } from './page/page.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, PageModule,AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
