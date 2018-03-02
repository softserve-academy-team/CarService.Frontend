import { Component, OnInit } from '@angular/core';
import { CustomerOrderInfo } from '../../models/customer-order-info';
import { ReviewProposition } from '../../models/review-proposition';
import { OrderStatus } from '../order-status';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AcceptReviewProposition } from '../../models/accept-review-proposition';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-customer-order-info',
  templateUrl: './customer-order-info.component.html',
  styleUrls: ['./customer-order-info.component.scss']
})
export class CustomerOrderInfoComponent implements OnInit {
  private order: CustomerOrderInfo;
  private mechanic: ReviewProposition;
  private color: string;
  
  loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.getCustomerOrderInfo();
  }

  getCustomerOrderInfo() {
    this.loading = true;

    this.orderService.getCustomerOrderInfo(+this.route.snapshot.paramMap.get('id')).subscribe((data: CustomerOrderInfo) => {
      this.order = data;

      if (this.order.status == OrderStatus.Done || this.order.status == OrderStatus.Pending)
        this.mechanic = this.order.reviewPropositions.find(r => r.mechanicId === this.order.mechanicId);

      switch (this.order.status) {
        case "Active": {
          this.color = "green";
          break;
        }
        case "Pending": {
          this.color = "orange";
          break;
        }
        case "Done": {
          this.color = "blue";
          break;
        }
        default: {
          this.color = "red";
        }
      }
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

  acceptPreposition(propositionId: number) {
    this.orderService.acceptReviewProposition(new AcceptReviewProposition(this.order.orderId, propositionId)).subscribe(data => {
      this.getCustomerOrderInfo();
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

  openSnackBar(body: string, button: string) {
    this.snackBar.open(body, button, {
      duration: 6000
    });
    this.router.navigate(['']);
  }
}
