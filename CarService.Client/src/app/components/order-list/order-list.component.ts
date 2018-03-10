import { Component, OnInit, AfterViewChecked, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { OrderSearchConfig } from '../../config-models/order-search-config';
import { GoogleMapConfig } from '../../config-models/google-map-config';
import { OrderSearchModel } from '../../models/order-search-model';
import { BaseOrderInfo } from '../../models/base-order-info';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderListComponent implements OnInit, AfterViewChecked {

  private readonly mapConfig: GoogleMapConfig;
  private readonly orderSearchConfig: OrderSearchConfig;

  private orders: BaseOrderInfo[] = [];
  private cities: Observable<string[]>;

  private skip: number = 0;
  private readonly take: number = 5;

  private orderSearchModel: OrderSearchModel;

  @ViewChild('scroll') private scrollContainer: ElementRef;
  private getOrders: boolean = false;
  private isAllOrdersReceived: boolean = false;

  constructor(private cdRef: ChangeDetectorRef,
    private orderService: OrderService) {

    this.mapConfig = environment.GoogleMap;
    this.orderSearchConfig = environment.OrderSearch;

    this.cities = this.orderService.getAllCities();
  }

  ngOnInit() {
    this.orderService.orderSearchButtonClicked.subscribe(orderSearchModel => {
      this.orderSearchButtonClickedHandler(orderSearchModel)
    });
    this.orderService.cityMarkerButtonClicked.subscribe((cityName: string) => {
      this.cityMarkerButtonClickedHandler(cityName)
    });

    this.orderSearchModel = new OrderSearchModel();
    this.orderService.getOrders(this.orderSearchModel, this.skip, this.take).subscribe(orders => {
      this.orders = orders;
    });
  }

  private orderSearchButtonClickedHandler(orderSearchModel: OrderSearchModel) {
    this.scrollToTop();
    this.isAllOrdersReceived = false;
    this.orderSearchModel = orderSearchModel;
    this.skip = 0;
    this.orderService.getOrders(orderSearchModel, this.skip, this.take).subscribe(orders => {
      this.orders = orders;
    });
  }

  private cityMarkerButtonClickedHandler(cityName: string) {
    this.scrollToTop();
    this.isAllOrdersReceived = false;    
    if (this.orderSearchModel != undefined && this.orderSearchModel != null) {
      this.orderSearchModel = new OrderSearchModel();
    }
    this.skip = 0;
    this.orderSearchModel.city = cityName;
    this.orderService.getOrders(this.orderSearchModel, this.skip, this.take).subscribe(orders => {
      this.orders = orders;
    });
  }

  // order scroll 

  private addOrdersToList() {
    this.getOrders = false;
    if (this.orderSearchModel != undefined && this.orderSearchModel != null) {
      this.skip += this.take;
      this.orderService.getOrders(this.orderSearchModel, this.skip, this.take).subscribe(orders => {
        if (orders.length > 0) {
          this.orders = this.orders.concat(orders);
        } else {
          this.skip -= this.take;
          this.isAllOrdersReceived = true;
        }
      },
        err => {
          this.skip -= this.take;
          this.isAllOrdersReceived = true;
        });
    }
  }

  private onScroll() {
    let element = this.scrollContainer.nativeElement;
    let atBottom = element.scrollHeight - element.scrollTop - element.clientHeight <= 1;
    if (atBottom && !this.getOrders && !this.isAllOrdersReceived) {
      this.getOrders = true;
    }
  }

  private scrollToTop() {
    this.scrollContainer.nativeElement.scrollTop = 0;
  }

  private onAddingOrders() {
    if (!this.getOrders) {
      return;
    }
    try {
      this.addOrdersToList();
    }
    catch (err) { }
  }

  ngAfterViewChecked() {
    this.onAddingOrders();
    this.cdRef.detectChanges();
  }

}
