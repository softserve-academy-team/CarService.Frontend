import { Component, OnInit, AfterViewChecked, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { OrderSearchConfig } from '../../config-models/order-search-config';
import { GoogleMapConfig } from '../../config-models/google-map-config';
import { OrderSearchModel } from '../../models/order-search-model';
import { BaseOrderInfo } from '../../models/base-order-info';
import { OrderService } from '../../services/order.service';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { ReviewPropositionDialogComponent } from '../../dialogs/review-proposition-dialog/review-proposition-dialog.component';
import { NullAstVisitor } from '@angular/compiler';
import { CreateReviewProposition } from '../../models/create-review-proposition';
import { HttpErrorResponse } from '@angular/common/http';

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
  private order: BaseOrderInfo;
  private reviewDescription: string;
  private reviewPrice: number;
  private orderId: number;

  private skip: number = 0;
  private readonly take: number = 5;

  private orderSearchModel: OrderSearchModel;

  @ViewChild('scroll') private scrollContainer: ElementRef;
  private getOrders: boolean = false;
  private isAllOrdersReceived: boolean = false;

  constructor(private cdRef: ChangeDetectorRef,
    private orderService: OrderService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) {

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

  createReviewPropositionDialog(order) {
    this.order = order;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { order: this.order }
    let createReviewProposition = this.dialog.open(ReviewPropositionDialogComponent, dialogConfig);

    createReviewProposition.afterClosed().subscribe(result => {
      if ((result != null)) {
        this.orderId = order.orderId;
        this.reviewDescription = result.reviewDescription;
        this.reviewPrice = result.reviewPrice;

        this.postCreatedReviewProposition();
        this.reviewPropositionCreatedSnackBar();

        console.log('Review create!');
      } else {
        console.log('Review create cancel');
      }
    })
  }

  private createReviewProposition(): CreateReviewProposition {
    let reviewProp = new CreateReviewProposition();
    reviewProp.orderId = this.orderId;
    reviewProp.reviewComment = this.reviewDescription;
    reviewProp.reviewPrice = this.reviewPrice;
    return reviewProp;
  }

  postCreatedReviewProposition(): void {
    let reviewProp = this.createReviewProposition();
    this.orderService.createReviewProposition(reviewProp).subscribe(data => {
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
        }
      }
    );
  }

  reviewPropositionCreatedSnackBar() {
    this.snackBar.open("Review proposition created!", "Ok", {
      duration: 5000
    });
  }
}
