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

  isLoading = true;

  currentWeather: currentLocationWeather = {
    currentLocation: "",
    country: "",
    prov: "",
    longitude: 0,
    latitude: 0,
    temperature: 0,
    wind: 0,
    windDirection: 0,
    windLocation: "",
  }

  constructor(private inputService: InputServiceService) {
    navigator.geolocation
      .getCurrentPosition((x) => {
        this.currentWeather.latitude = x.coords.latitude;
        this.currentWeather.longitude = x.coords.longitude;
        const info = this.cityCountryProv(this.currentWeather.latitude, this.currentWeather.longitude)
        setTimeout(() => {this.findMeoteoData(this.currentWeather.longitude, this.currentWeather.latitude, info[0], info[1], info[2]);}, 1000)
      });


    this.inputService.testShared.subscribe(element => {
      if (element !== null) {
        this.findMeoteoData(parseFloat(element[1]), parseFloat(element[0]),  element[2], element[3], element[4])
      }
    })
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
  }

  private async findMeoteoData(longitude: number, latitude: number, currentLocation: string, country: string, prov: string): Promise<void> {
    const dataStream = await fetch(`https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${latitude}&lon=${longitude}`);
    const data: Meteo = await dataStream.json();
    const today = data.properties.timeseries[0].data.instant.details;
    this.currentWeather.currentLocation = currentLocation
    this.currentWeather.country = country
    this.currentWeather.prov = prov
    this.weather = data.properties.timeseries;
    this.currentWeather.temperature = today.air_temperature;
    this.currentWeather.wind = today.wind_speed;
    this.currentWeather.windDirection = today.wind_from_direction;
    this.currentWeather.windLocation = this.windLocated(windLocation, today.wind_from_direction)
    this.isLoading = false;
  }

  private windLocated(object: object, direction: number) {
    const num = Object.values(object).reduce( (prev, curr) => Math.abs(curr-direction) < Math.abs(prev-direction) ? curr : prev)
    return Object.keys(object).find(key => object[key] === num);
  }

  private cityCountryProv(lat, long){
    const url = `https://geocode.xyz/${lat},${long}?json=1&auth=304754158337206435710x11135`
    const arr = []
    const latLong = async () => {
      try {
        let [location] = await Promise.all([
          fetch(url)
        ])
        const infoLocation = await location.json();
        arr.push(infoLocation.city)
        arr.push(infoLocation.country)
        arr.push(infoLocation.prov)
      } catch (err) {
        console.log(err);
      }
    }
    latLong()
    return arr
  }
}
