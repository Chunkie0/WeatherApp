import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Meteo, currentLocationWeather } from '../meteo';
import { windLocation } from "../wind-direction"
import { InputServiceService } from '../input-service.service';

@Component({
  selector: 'app-current-location-weather',
  templateUrl: './current-location-weather.component.html',
  styleUrls: ['./current-location-weather.component.css']
})



export class CurrentLocationWeatherComponent implements OnInit, AfterViewInit {
  weather: any[] = [];

  items = []

  currentWeather: currentLocationWeather = {
    currentLocation: "",
    longitude: 0,
    latitude: 0,
    temperature: 0,
    wind: 0,
    windDirection: 0,
    windLocation: ""
  }

  constructor(private inputService: InputServiceService) {
    navigator.geolocation
      .getCurrentPosition((x) => {
        this.currentWeather.latitude = x.coords.latitude;
        this.currentWeather.longitude = x.coords.longitude;
        this.findMeoteoData(this.currentWeather.longitude, this.currentWeather.latitude);
      });


    this.inputService.testShared.subscribe(element => {
      if (element !== null) {
        this.findMeoteoData(parseFloat(element[1]), parseFloat(element[0]))
      }
    })
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
  }

  private async findMeoteoData(longitude: number, latitude: number): Promise<void> {
    const dataStream = await fetch(`https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${latitude}&lon=${longitude}`);
    const data: Meteo = await dataStream.json();
    const today = data.properties.timeseries[0].data.instant.details;
    this.weather = data.properties.timeseries;
    this.currentWeather.temperature = today.air_temperature;
    this.currentWeather.wind = today.wind_speed;
    this.currentWeather.windDirection = today.wind_from_direction;
    this.currentWeather.windLocation = this.windLocated(windLocation, today.wind_from_direction)
  }

  private windLocated(object: object, direction: number) {
    const num = Object.values(object).reduce( (prev, curr) => Math.abs(curr-direction) < Math.abs(prev-direction) ? curr : prev)
    return Object.keys(object).find(key => object[key] === num);
  }
}
