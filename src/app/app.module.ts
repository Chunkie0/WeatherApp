import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CurrentLocationWeatherComponent } from './current-location-weather/current-location-weather.component';
import { WeatherOnInputComponent } from './weather-on-input/weather-on-input.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    CurrentLocationWeatherComponent,
    WeatherOnInputComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
