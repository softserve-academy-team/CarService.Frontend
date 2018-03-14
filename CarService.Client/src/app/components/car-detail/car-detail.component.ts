import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { DetailCarInfo } from '../../models/detail-car-info';
import { CarService } from '../../services/car.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CreateOrderDialogComponent } from '../../dialogs/create-order-dialog/create-order-dialog.component';
import { UnregisterUserDialogComponent } from '../../dialogs/unregister-user-dialog/unregister-user-dialog.component';
import { CreateOrder } from '../../models/create-order';
import { OrderService } from '../../services/order.service';
import { MatSnackBar } from '@angular/material';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.scss']
})

export class CarDetailComponent implements OnInit {

  private detailCarById: DetailCarInfo;
  private carPhotosAll: Array<string> = [];
  private orderDescription: string;
  private agreeLoginUser: boolean;
  private isCarInFavorites: boolean;

  constructor(
    private route: ActivatedRoute,
    private carService: CarService,
    private orderService: OrderService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private profileService: ProfileService
  ) { }

  ngOnInit() {
    this.getDetailCarById();
    this.getCarPhotos();
    this.isCarInFavoritesMethod();
  }

  getDetailCarById(): void {
    this.carService.getDetailCarById(+this.route.snapshot.paramMap.get('id')).subscribe((data: DetailCarInfo) => {
      this.detailCarById = data;
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

  getCarPhotos(): void {
    this.carService.getCarPhotos(+this.route.snapshot.paramMap.get('id')).subscribe(
      value => this.carPhotosAll = value
    );
  }

  chooseCreateOrderDialogs() {
    if (localStorage.getItem('token')) {
      this.createOrderDialog();
    } else {
      this.unregisterUserDialog();
    }
  }

  createOrderDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { orderDescription: this.orderDescription }
    let createOrder = this.dialog.open(CreateOrderDialogComponent, dialogConfig);

    createOrder.afterClosed().subscribe(result => {
      if ((result != null)) {
        this.orderDescription = result.orderDescription;

        this.postCreatedOrder();
        this.orderCreatedSnackBar();

        console.log('Order create!');
      } else {
        console.log('Order create cancel');
      }
    });
  }

  unregisterUserDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    let createUnregister = this.dialog.open(UnregisterUserDialogComponent, dialogConfig);

    createUnregister.afterClosed().subscribe(result => {
      this.agreeLoginUser = result;
      if (this.agreeLoginUser) {
        console.log('Log In agree');
      } else {
        console.log('Log In cancel');
      }
    });
  }

  private createOrder(): CreateOrder {
    let order = new CreateOrder();
    order.autoRiaId = +this.route.snapshot.paramMap.get('id');
    order.description = this.orderDescription;
    order.markName = this.detailCarById.markName;
    order.modelName = this.detailCarById.modelName;
    order.year = this.detailCarById.year;
    order.photoLink = this.detailCarById.photoLink;
    order.city = this.detailCarById.city;
    order.categoryId = this.detailCarById.categoryId;
    order.markId = this.detailCarById.markId;
    order.modelId = this.detailCarById.modelId;
    return order;
  }

  postCreatedOrder(): void {
    let order = this.createOrder();
    this.orderService.createOrder(order).subscribe(data => {
      this.isCarInFavorites = true;
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

  addCarToFavorites(): void {
    this.profileService.addCarToFavorites(+this.route.snapshot.paramMap.get('id')).subscribe(data => {
      this.isCarInFavorites = true;
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

  deleteCarFromFavorites(): void {
    this.profileService.deleteCarFromFavorites(+this.route.snapshot.paramMap.get('id')).subscribe(data => {
      this.isCarInFavorites = false;
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

  isCarInFavoritesMethod(): void {
    this.profileService.isCarInFavorites(+this.route.snapshot.paramMap.get('id')).subscribe(data => {
      this.isCarInFavorites = data;
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

  orderCreatedSnackBar() {
    this.snackBar.open("Order created!", "Ok", {
      duration: 5000
    });
  }
}
