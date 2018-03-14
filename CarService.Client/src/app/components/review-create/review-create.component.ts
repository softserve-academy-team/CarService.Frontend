import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ReviewService } from './../../services/review.service';
import { CreateReview } from '../../models/create-review';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-review-create',
  templateUrl: './review-create.component.html',
  styleUrls: ['./review-create.component.scss']
})
export class ReviewCreateComponent implements OnInit {
  @Input() order: number;
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  firstCtrl: AbstractControl;
  reviewId: number;


  constructor(private _formBuilder: FormBuilder, private reviewService: ReviewService) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });

    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

    this.firstCtrl = this.firstFormGroup.controls['firstCtrl'];
  }

  createReview() {
    this.reviewService.createReview(new CreateReview( 52, this.firstCtrl.value)).subscribe((data: number) => {
      
      console.log(data);

      this.reviewId = data;
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
}
