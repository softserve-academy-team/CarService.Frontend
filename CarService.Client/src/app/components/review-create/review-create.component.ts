import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ReviewService } from './../../services/review.service';
import { CreateReview } from '../../models/create-review';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { CommunicationService } from '../../services/communication.service';
import { environment } from '../../../environments/environment';
import { RestUrlBuilder } from '../../services/rest-url-builder';

@Component({
  selector: 'app-review-create',
  templateUrl: './review-create.component.html',
  styleUrls: ['./review-create.component.scss']
})
export class ReviewCreateComponent implements OnInit {
  private readonly carServiceApiBaseUrl: string;
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  firstCtrl: AbstractControl;
  reviewId: number;
  videoUrl: string;
  photoUrl: string;


  constructor(
    private route: ActivatedRoute,
    private _formBuilder: FormBuilder, 
    private reviewService: ReviewService,
    private communicationService: CommunicationService,
    private restUrlBuilder: RestUrlBuilder) { 
      this.carServiceApiBaseUrl = environment['CarServiceApiBaseUrl'];
    }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });

    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

    this.firstCtrl = this.firstFormGroup.controls['firstCtrl'];

    this.photoUrl = this.restUrlBuilder.build(this.carServiceApiBaseUrl, 'review', 'save_photo');
    this.videoUrl = this.restUrlBuilder.build(this.carServiceApiBaseUrl, 'review', 'save_video');
  }

  createReview() {
    this.reviewService.createReview(new CreateReview( +this.route.snapshot.paramMap.get('id'), this.firstCtrl.value)).subscribe((data: number) => {
      this.reviewId = data;
      this.communicationService.sendReview(data);
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
