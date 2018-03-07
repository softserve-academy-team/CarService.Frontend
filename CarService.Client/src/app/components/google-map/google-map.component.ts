import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { } from 'googlemaps';
import { GoogleMapConfig } from '../../config-models/google-map-config';
import { CityLocation } from '../../models/city-location';
import { MapsService } from '../../services/maps-service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent implements OnInit {

  @Input()
  private readonly mapConfig: GoogleMapConfig;

  private latitude: number;
  private longitude: number;
  private zoom: number;

  @Input()
  private cities: Observable<string[]>;
  private citiesLocations: CityLocation[] = [];

  constructor(private mapsService: MapsService,
    private orderService: OrderService) { }

  ngOnInit() {
    this.latitude = this.mapConfig.defaultLat;
    this.longitude = this.mapConfig.defaultLng;
    this.zoom = this.mapConfig.defaultZoom;

    this.cities.subscribe(cities => {
      cities.forEach(city => {
        let cityLocation = new CityLocation();
        cityLocation.cityName = city;
        this.mapsService.getCityLocation(city).subscribe(cityLocation => {
          this.citiesLocations.push(cityLocation);
        }, error => console.log(error), () => { });
      });
    });
  }

  searchByCity(cityName: string) {
    this.orderService.cityMarkerButtonClicked.emit(cityName);
  }

}


