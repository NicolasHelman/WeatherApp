import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GeolocationData } from 'src/app/models/geolocation.model';
import { WeatherData } from 'src/app/models/weather.model';
import { Daily, Hourly, WeatherForecastData } from 'src/app/models/weatherForecast.model';
import { WeatherService } from 'src/app/services/weather.service';


@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  constructor(
    private weatherService: WeatherService,
    private toastr: ToastrService
  ){}

  cityName: string = 'Buenos Aires';

  weatherData?: WeatherData;
  weatherForecastData?: WeatherForecastData;
  geolocationData?: GeolocationData;

  hourlyWeather?: Hourly[];
  dailyWeather?: Daily[];
  
  month = new Date().toLocaleString('en-GB', { month: 'short' });
  weekday = new Date().toLocaleString('en-GB', { weekday: 'short' });
  day = new Date().toLocaleString('en-GB', { day: 'numeric' });

  ngOnInit(): void {
    if (navigator?.geolocation) {
      this.getLocation();
    }
    this.getWeatherData(this.cityName);
    this.cityName = '';
  }

  onSubmit() {
    this.getWeatherData(this.cityName);
    this.cityName = '';
  }

  private getWeatherData(cityName: string) {

    this.weatherService.getWeatherData(cityName).subscribe(
      
      responseWeatherData => {
        this.weatherData = responseWeatherData; 

        console.log(this.weatherData);

        // Weather Forecast
        let lat = this.weatherData.coord.lat;
        let lon = this.weatherData.coord.lon;

        this.weatherService.getWeatherForecastData(lat,lon).subscribe(
          responseWeatherForecastData => {
            this.weatherForecastData = responseWeatherForecastData;

            this.hourlyWeather = this.weatherForecastData.hourly.slice(0,25);
            this.dailyWeather = this.weatherForecastData.daily;

            console.log(this.weatherForecastData);
          }
        );

      }, error => {
        this.toastr.error('Location not found','Error');
      }

    );
    
    console.log("Geolocation Disabled");
    
  }

  
  private async getLocation(): Promise<void> {

    const { coords } = await this.weatherService.getGeolocation();

    this.weatherService.getWeatherDataByCoords(coords).subscribe(

      responseWeatherDataByCoords => {
        this.weatherData = responseWeatherDataByCoords; 
        console.log(this.weatherData);

        // Weather Forecast
        let lat = this.weatherData.coord.lat;
        let lon = this.weatherData.coord.lon;

        this.weatherService.getWeatherForecastData(lat,lon).subscribe(
          responseWeatherForecastData => {
            this.weatherForecastData = responseWeatherForecastData;

            this.hourlyWeather = this.weatherForecastData.hourly.slice(0,25);
            this.dailyWeather = this.weatherForecastData.daily;

            console.log(this.weatherForecastData);
          }
        );

      }, error => {
        this.toastr.error('Location not found','Error');
      }

    );

    console.log("Geolocation Enabled");
  
  }
  
}
