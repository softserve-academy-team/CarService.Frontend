import { Component, OnInit, Input } from '@angular/core';
import { environment } from '../../../environments/environment';
import { } from 'googlemaps';
import { GoogleMapConfig } from '../../config-models/google-map-config';
import { CityLocation } from '../../models/city-location';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent implements OnInit {

  private readonly mapConfig: GoogleMapConfig;

  private latitude: number;
  private longitude: number;
  private zoom: number;

  @Input()
  private citiesLocations: CityLocation[];

  constructor(private orderService: OrderService) {
    this.mapConfig = environment["GoogleMap"];
  }

  ngOnInit() {
    this.latitude = this.mapConfig.defaultLat;
    this.longitude = this.mapConfig.defaultLng;
    this.zoom = this.mapConfig.defaultZoom;
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = this.mapConfig.defaultSearchZoom;
      });
    }
  }

  searchByCity(cityName: string) {
    this.orderService.cityMarkerButtonClicked.emit(cityName);
  }

}


