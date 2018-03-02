import { Component, OnInit, Input } from '@angular/core';
import { ProfileReviewInfo } from '../../models/profile-review-info';

@Component({
  selector: 'app-review-card',
  templateUrl: './review-card.component.html',
  styleUrls: ['./review-card.component.scss']
})
export class ReviewCardComponent implements OnInit {
  @Input() review: ProfileReviewInfo;
  @Input() link: string;
  
  constructor() { }

  ngOnInit() {
  }

  getLink(): string {
    return `${this.link}/${this.review.reviewId}`;
  }
}
