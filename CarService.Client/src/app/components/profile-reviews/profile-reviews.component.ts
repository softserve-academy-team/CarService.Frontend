import { Component, OnInit } from '@angular/core';
import { ProfileReviewInfo } from '../../models/profile-review-info';
import { ProfileService } from '../../services/profile.service';
import { HttpErrorResponse } from '@angular/common/http';

declare let require: any;

@Component({
  selector: 'app-profile-reviews',
  templateUrl: './profile-reviews.component.html',
  styleUrls: ['./profile-reviews.component.scss']
})
export class ProfileReviewsComponent implements OnInit {
  isMechanic: boolean;
  loadingBought = false;
  loadingCreated = false;
  enabledBought = true;
  enabledCreated = true;

  private boughtReviews: ProfileReviewInfo[];
  private createdReviews: ProfileReviewInfo[];
  private decode = require('jwt-decode');

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    var decoded = this.decode(localStorage.getItem('token'));
    var tokenMap = new Map(Object.entries(decoded));
    this.isMechanic = tokenMap.get("http://schemas.microsoft.com/ws/2008/06/identity/claims/role").toString() === "mechanic";
    
    this.getUserBoughtReviews();

    if (this.isMechanic) {
      this.getUserCreatedReviews();
    }
  }

  private getUserBoughtReviews() {
    this.loadingBought = true;

    this.profileService.getUserBoughtReviews().subscribe((data: ProfileReviewInfo[]) => {
      this.boughtReviews = data;
      if (!this.boughtReviews ||  this.boughtReviews.length == 0)
      {
        this.enabledBought = false;
      }
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
        }
      }
    );

    this.loadingBought = false;
  }

  private getUserCreatedReviews() {
    this.loadingCreated = true;
    
    this.profileService.getUserCreatedReviews().subscribe((data: ProfileReviewInfo[]) => {
      this.createdReviews = data;
      if (!this.createdReviews ||  this.createdReviews.length == 0)
      {
        this.enabledCreated = false;
      }
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
        }
      }
    );

    this.loadingCreated = false;
  }

  routerLinkForBought(): string {
    return "";
  }

  routerLinkForCreated(): string {
    return "";
  }
}
