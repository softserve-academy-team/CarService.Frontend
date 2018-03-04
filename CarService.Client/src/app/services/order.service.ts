import { Injectable, EventEmitter } from '@angular/core';
import { CityLocation } from '../models/city-location';
import { BaseOrderInfo } from '../models/base-order-info';

@Injectable()
export class OrderService {
    
    public newOrdersFound: EventEmitter<BaseOrderInfo[]>;
    public cityMarkerButtonClicked: EventEmitter<string>;

    constructor() {
        this.newOrdersFound = new EventEmitter<BaseOrderInfo[]>();
        this.cityMarkerButtonClicked = new EventEmitter<string>();
    }

    getAllCitiesLocations(): CityLocation[] {
        return [
            { cityName: "qqqq", lat: -31.563910, lng: 147.154312 },
            { cityName: "qqqq", lat: -33.718234, lng: 150.363181 },
            { cityName: "qqqq", lat: -33.727111, lng: 150.371124 },
            { cityName: "qqqq", lat: -33.848588, lng: 151.209834 },
            { cityName: "qqqq", lat: -33.851702, lng: 151.216968 },
            { cityName: "qqqq", lat: -34.671264, lng: 150.863657 },
            { cityName: "qqqq", lat: -35.304724, lng: 148.662905 },
            { cityName: "qqqq", lat: -36.817685, lng: 175.699196 },
            { cityName: "qqqq", lat: -36.828611, lng: 175.790222 },
            { cityName: "qqqq", lat: -37.750000, lng: 145.116667 },
            { cityName: "qqqq", lat: -37.759859, lng: 145.128708 },
            { cityName: "qqqq", lat: -37.765015, lng: 145.133858 },
            { cityName: "qqqq", lat: -37.770104, lng: 145.143299 },
            { cityName: "qqqq", lat: -37.773700, lng: 145.145187 },
            { cityName: "qqqq", lat: -37.774785, lng: 145.137978 },
            { cityName: "qqqq", lat: -37.819616, lng: 144.968119 },
            { cityName: "qqqq", lat: -38.330766, lng: 144.695692 },
            { cityName: "qqqq", lat: -39.927193, lng: 175.053218 },
            { cityName: "qqqq", lat: -41.330162, lng: 174.865694 },
            { cityName: "qqqq", lat: -42.734358, lng: 147.439506 },
            { cityName: "qqqq", lat: -42.734358, lng: 147.501315 },
            { cityName: "qqqq", lat: -42.735258, lng: 147.438000 },
            { cityName: "qqqq", lat: -43.999792, lng: 170.463352 }
        ] as CityLocation[];
    }

    getBaseOrderInfo(orderId: number): BaseOrderInfo {
        return new BaseOrderInfo();
    }

}
