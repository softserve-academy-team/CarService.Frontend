import { Component, OnInit, ViewChild } from '@angular/core';
import { } from '@types/googlemaps';
import { environment } from '../../../environments/environment';
import { GoogleMapConfig } from '../../config-models/google-map-config';
import { RegionInfo } from '../../models/region-info';
import { RegionService } from '../../services/region-service';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent implements OnInit {

  private readonly mapConfig: GoogleMapConfig;

  @ViewChild('gmap') gmapElement: any;
  private map: google.maps.Map;

  private regionInfoWindow: google.maps.InfoWindow;
  private regionsMarkers: google.maps.Marker[];
  private areRegionsDisplayed: boolean;

  constructor(private regionService: RegionService) {
    this.mapConfig = environment["GoogleMap"];
  }

  ngOnInit() {
    let mapProperties = {
      center: new google.maps.LatLng(this.mapConfig.defaultLat, this.mapConfig.defaultLng),
      zoom: this.mapConfig.defaultZoom
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProperties);

    this.map.addListener('zoom_changed', () => {
      if (this.areRegionsDisplayed && this.map.getZoom() == this.mapConfig.criticalZoom) {
        this.hideRegionsMarkers();
        this.areRegionsDisplayed = false;
      }
      else if (!this.areRegionsDisplayed && this.map.getZoom() == this.mapConfig.criticalZoom - 1) {
        this.showRegionsMarkers();
        this.areRegionsDisplayed = true;
      }
    });

    this.regionInfoWindow = new google.maps.InfoWindow();
    this.regionsMarkers = this.createRegionsMarkers(this.regionService.getUkrainianRegions());
    this.areRegionsDisplayed = true;
  }

  createRegionsMarkers(regions: RegionInfo[]): google.maps.Marker[] {
    let regionsMarkers: google.maps.Marker[] = [];

    for (let i = 0; i < regions.length; ++i) {
      let marker = new google.maps.Marker({
        map: this.map,
        position: new google.maps.LatLng(regions[i].lat, regions[i].lng),
        title: `In ${regions[i].name} region ${regions[i].countOrders} orders.`
      });

      marker.addListener('click', () => {
        this.populateInfoWindow(marker, this.regionInfoWindow);
      });

      regionsMarkers.push(marker);
    }

    return regionsMarkers;
  }

  populateInfoWindow(marker: google.maps.Marker, infoWindow: google.maps.InfoWindow) {
    infoWindow.setContent(marker.getTitle());
    infoWindow.open(this.map, marker);
  }

  showRegionsMarkers() {
    for (let i = 0; i < this.regionsMarkers.length; ++i) {
      this.regionsMarkers[i].setMap(this.map);
    }
  }

  hideRegionsMarkers() {
    for (let i = 0; i < this.regionsMarkers.length; ++i) {
      this.regionsMarkers[i].setMap(null);
    }
  }

}


