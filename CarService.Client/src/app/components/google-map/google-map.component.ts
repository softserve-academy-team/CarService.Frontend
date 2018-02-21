import { Component, OnInit, ViewChild } from '@angular/core';
import { } from '@types/googlemaps';
import { environment } from '../../../environments/environment';
import { GoogleMapConfig } from '../../config-models/google-map-config';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent implements OnInit {

  mapConfig: GoogleMapConfig;

  @ViewChild('gmap') gmapElement: any;
  private map: google.maps.Map;
  private mapProperties: any;

  constructor() {
    this.mapConfig = environment["GoogleMap"];
  }

  ngOnInit() {
    this.mapProperties = {
      center: new google.maps.LatLng(this.mapConfig.defaultLat, this.mapConfig.defaultLng),
      zoom: this.mapConfig.defaultZoom,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, this.mapProperties);
  }

}
