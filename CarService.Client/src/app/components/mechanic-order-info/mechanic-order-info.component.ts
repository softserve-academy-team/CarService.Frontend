import { Component, OnInit } from '@angular/core';
import { MechanicOrderInfo } from '../../models/mechanic-order-info';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { MatSnackBar } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-mechanic-order-info',
  templateUrl: './mechanic-order-info.component.html',
  styleUrls: ['./mechanic-order-info.component.scss']
})
export class MechanicOrderInfoComponent implements OnInit {
  private order: MechanicOrderInfo;
  private status: string;
  private loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    this.getMechanicOrderInfo();
  }

  getMechanicOrderInfo() {
    this.loading = true;

    this.orderService.getMechanicOrderInfo(+this.route.snapshot.paramMap.get('id')).subscribe((data: MechanicOrderInfo) => {
      this.order = data;

      if (!this.order.isDoIt)
        this.status = "Don't get order";
      else
        this.status = this.order.status;
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
          this.openSnackBar("Sorry Something Go Wrong", "Ok");
        }
      }
    );

    this.loading = false;
  }

  openSnackBar(body: string, button: string) {
    this.snackBar.open(body, button, {
      duration: 6000
    });
    this.router.navigate(['']);
  }
}
