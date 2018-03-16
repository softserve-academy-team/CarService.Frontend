import { Component, OnInit, Input } from '@angular/core';
import { CarDetailComponent } from '../car-detail/car-detail.component';

@Component({
  selector: 'app-car-detail-gallery',
  templateUrl: './car-detail-gallery.component.html',
  styleUrls: ['./car-detail-gallery.component.scss']
})
export class CarDetailGalleryComponent implements OnInit {

numOfCurrImg: number;
numOfImages: number;
time: number;
hide: boolean;

@Input() carImages: Array<string> = [];

  constructor() { }

  ngOnInit() {
    this.numOfImages = this.carImages.length;
    this.numOfCurrImg = 0;
    this.time = 6000;
    this.hide = true;
    this.changeImageSourceWithInterval();
  }

  leftClick() {
    if (this.numOfCurrImg === 0) {
      this.numOfCurrImg = this.carImages.length - 1;
    } else {
      --this.numOfCurrImg;
    }
  }

  rightClick() {
    if (this.numOfCurrImg === this.carImages.length - 1) {
      this.numOfCurrImg = 0;
    } else {
      ++this.numOfCurrImg;
    }
  }

  changeImageSourceWithInterval() {
    setInterval(
        () =>  {
            this.rightClick();
        }, this.time);
  }

}
