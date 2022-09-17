import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Coords } from '../models/geolocation.model';
import { WeatherData } from '../models/weather.model';
import { WeatherForecastData } from '../models/weatherForecast.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  public getWeatherData(cityName: string): Observable<WeatherData> {

    return this.http.get<WeatherData>(environment.weatherApiUrl, {
      params: new HttpParams()
      .set('q', cityName)
      .set('units', 'metric')
      .set('appid', environment.weatherApiKey)
    })

  }

  public getWeatherDataByCoords(coord: Coords): Observable<WeatherData> {

    return this.http.get<WeatherData>(environment.weatherApiUrl, {
      params: new HttpParams()
      .set('lat', coord.latitude)
      .set('lon', coord.longitude)
      .set('exclude', '')
      .set('appid', environment.weatherApiKey)
      .set('units', 'metric')
    })

  }

  public getWeatherForecastData(lat: number, lon: number): Observable<WeatherForecastData> {

    return this.http.get<WeatherForecastData>(environment.weatherForecastApiUrl, {
      params: new HttpParams()
      .set('lat', lat)
      .set('lon', lon)
      .set('exclude', '')
      .set('appid', environment.weatherApiKey)
      .set('units', 'metric')
    })

  }

  public getGeolocation():Promise<any> {

    const options = {
      enableHighAccuracy: true,
      timeout: 3000,
      maximunAge: 0
    };

    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, options)
    })
    
  }

}
