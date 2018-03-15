import { Component, OnInit } from '@angular/core';
import { ReviewDto } from '../../models/review-dto';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewService } from '../../services/review.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-review-info',
  templateUrl: './review-info.component.html',
  styleUrls: ['./review-info.component.scss']
})
export class ReviewInfoComponent implements OnInit {
  private review: ReviewDto;
  private hasPhotos = false;
  private hasVideos = false;

  constructor(
    private route: ActivatedRoute,
    private reviewService: ReviewService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    this.getReviewInfo();
  }

  getReviewInfo() {
    this.reviewService.getReview(+this.route.snapshot.paramMap.get('id')).subscribe((data: ReviewDto) => {
      this.review = data;

      if (this.review.photos != undefined && this.review.photos.length > 0)
        this.hasPhotos = true;

      if (this.review.videos != undefined && this.review.videos.length > 0)
        this.hasVideos = true;
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
          this.openSnackBar("Sorry Something Go Wrong", "Ok");
        }
      });
  }

  openSnackBar(body: string, button: string) {
    this.snackBar.open(body, button, {
      duration: 6000
    });
    this.router.navigate(['']);
  }
}
