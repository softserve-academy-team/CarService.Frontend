import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MapsAPILoader } from '@agm/core';
import { CityLocation } from '../models/city-location';

@Injectable()
export class MapsService {

    constructor(private mapsAPILoader: MapsAPILoader) { }

    getGeocoding(address: string) {
        return Observable.create(observer => {
            try {
                this.mapsAPILoader.load().then(() => {
                    let geocoder = new google.maps.Geocoder();
                    geocoder.geocode({ 'address': address }, (results, status) => {
                        if (status === google.maps.GeocoderStatus.OK) {
                            const place = results[0].geometry.location;
                            observer.next(place);
                            observer.complete();
                        } else {
                            if (status === google.maps.GeocoderStatus.ZERO_RESULTS) {
                                observer.error('Address not found!');
                            } else {
                                observer.error(status);
                            }

                            observer.complete();
                        }
                    });
                });
            } catch (error) {
                observer.error('error getGeocoding' + error);
                observer.complete();
            }
        });
    }

    getCityLocation(cityName: string): Observable<CityLocation> {
        return Observable.create(observer => {
            let cityLocation = new CityLocation();
            cityLocation.cityName = cityName;
            this.getGeocoding(cityName).subscribe(location => {
                cityLocation.lat = location.lat();
                cityLocation.lng = location.lng();
                observer.next(cityLocation);
                observer.complete();
            });
        });
    }

}