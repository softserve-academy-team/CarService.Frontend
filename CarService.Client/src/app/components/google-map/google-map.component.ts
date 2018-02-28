import { Component, OnInit } from '@angular/core';
// import { ViewChild, ElementRef, NgZone } from '@angular/core';
// import { FormControl } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { } from 'googlemaps';
// import { MapsAPILoader } from '@agm/core';
import { GoogleMapConfig } from '../../config-models/google-map-config';
import { OrderLocation } from '../../models/order-location';
import { BaseOrderInfo } from '../../models/base-order-info';
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

  // private searchControl: FormControl;
  // @ViewChild("search")
  // private searchElementRef: ElementRef;

  private ordersLocations: OrderLocation[] = [];

  private order: BaseOrderInfo;

  constructor(
    private orderService: OrderService,
    // private mapsAPILoader: MapsAPILoader,
    // private ngZone: NgZone
  ) {
    this.mapConfig = environment["GoogleMap"];
  }

  ngOnInit() {
    this.latitude = this.mapConfig.defaultLat;
    this.longitude = this.mapConfig.defaultLng;
    this.zoom = this.mapConfig.defaultZoom;

    // this.searchControl = new FormControl();

    // this.setCurrentPosition();

    //this.initAutocomplete();

    this.ordersLocations = this.orderService.getAllOrdersLocations();
  }

  // private initAutocomplete() {
  //   this.mapsAPILoader.load().then(() => {
  //     let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
  //       types: ["address"]
  //     });
  //     autocomplete.addListener("place_changed", () => {
  //       this.ngZone.run(() => {
  //         let place: google.maps.places.PlaceResult = autocomplete.getPlace();

  //         if (place.geometry === undefined || place.geometry === null) {
  //           return;
  //         }

  //         this.latitude = place.geometry.location.lat();
  //         this.longitude = place.geometry.location.lng();
  //         this.zoom = this.mapConfig.defaultSearchZoom;
  //       });
  //     });
  //   });
  // }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = this.mapConfig.defaultSearchZoom;
      });
    }
  }

  private showDetailedInfo(location: OrderLocation) {
    this.order = this.orderService.getBaseOrderInfo(location.orderId);
  }

}


