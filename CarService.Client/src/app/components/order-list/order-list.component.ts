import { Component } from '@angular/core';
import { BaseOrderInfo } from '../../models/base-order-info';
import { CityLocation } from '../../models/city-location';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent {

  private orders: BaseOrderInfo[] = [];
  private citiesLocations: CityLocation[] = [];

  constructor(private orderService: OrderService) {
    for (var i = 0; i < 20; ++i) {
      this.orders.push(new BaseOrderInfo());
    }

    this.citiesLocations = this.orderService.getAllCitiesLocations();

    this.orderService.newOrdersFound.subscribe((orders: BaseOrderInfo[]) => {
      this.newOrdersFoundHandler(orders);
    });
  }

  private newOrdersFoundHandler(orders: BaseOrderInfo[]) {
    this.orders = orders;
  }

}
