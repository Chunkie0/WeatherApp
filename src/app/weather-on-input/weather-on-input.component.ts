import { Component, OnInit } from '@angular/core';
import { InputServiceService } from '../input-service.service';
@Component({
  selector: 'app-weather-on-input',
  templateUrl: './weather-on-input.component.html',
  styleUrls: ['./weather-on-input.component.css']
})

export class WeatherOnInputComponent implements OnInit {
  title: string = "Search for weather";
  text: string;

  constructor(private inputService: InputServiceService) {
  }

  ngOnInit(): void {
  }

  onSubmit() {

    const latLong = async () => {
      try {
        let [location] = await Promise.all([
          fetch(`https://geocode.xyz/${this.text}?json=1&auth=304754158337206435710x11135`)
        ])
        const infoLocation = await location.json();
        const latt = infoLocation.latt
        const longt = infoLocation.longt
        const city = infoLocation.standard.city
        const country = infoLocation.standard.countryname
        const prov = infoLocation.standard.prov

        this.inputService.changeElement([latt, longt, city, country, prov])
      } catch (err) {
        console.log(err);
      };
    }

    latLong()
  }

}
