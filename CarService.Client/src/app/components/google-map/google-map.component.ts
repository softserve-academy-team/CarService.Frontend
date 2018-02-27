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

  @ViewChild('pacInput') pacInput: any;

  constructor(private regionService: RegionService) {
    this.mapConfig = environment["GoogleMap"];
  }

  ngOnInit() {
    let mapProperties = {
      center: new google.maps.LatLng(this.mapConfig.defaultLat, this.mapConfig.defaultLng),
      zoom: this.mapConfig.defaultZoom
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProperties);

    this.regionInfoWindow = new google.maps.InfoWindow();
    this.regionsMarkers = this.createRegionsMarkers(this.regionService.getUkrainianRegions());
    this.areRegionsDisplayed = true;
    this.initMarkersDisplaying();

    this.initAutocomplete();
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

  initMarkersDisplaying() {
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
  }

  initAutocomplete() {
    let searchBox = new google.maps.places.SearchBox(this.pacInput.nativeElement);
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(this.pacInput.nativeElement);

    this.map.addListener('bounds_changed', () => {
      searchBox.setBounds(this.map.getBounds());
    });

    let markers = [];

    searchBox.addListener('places_changed', () => {
      let places = searchBox.getPlaces();

      if (places.length == 0) {
        return;
      }

      markers.forEach((marker: google.maps.Marker) => {
        marker.setMap(null);
      });
      markers = [];

      let bounds = new google.maps.LatLngBounds();
      places.forEach((place) => {
        if (!place.geometry) {
          console.log("Returned place contains no geometry");
          return;
        }
        // let icon = {
        //   url: place.icon,
        //   size: new google.maps.Size(71, 71),
        //   origin: new google.maps.Point(0, 0),
        //   anchor: new google.maps.Point(17, 34),
        //   scaledSize: new google.maps.Size(25, 25)
        // };

        markers.push(new google.maps.Marker({
          map: this.map,
          // icon: icon,
          title: place.name,
          position: place.geometry.location
        }));

        if (place.geometry.viewport) {
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      this.map.fitBounds(bounds);
    });
  }

}


