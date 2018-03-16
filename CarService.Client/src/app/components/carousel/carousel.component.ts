import { Component, OnInit, Input } from '@angular/core';
import { Image } from '../../models/carousel.array.model';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  @Input() images: Image[];
numOfCurrImg: number;
numOfImages: number;
time: number;
hide: boolean;

  constructor() { }

  ngOnInit() {
    this.numOfImages = this.images.length;
    this.numOfCurrImg = 0;
    this.time = 6000;
    this.hide = true;
    this.changeImageSourceWithInterval();
  }

  leftClick() {
    if (this.numOfCurrImg === 0) {
      this.numOfCurrImg = this.numOfImages - 1;
    } else {
      --this.numOfCurrImg;
    }
  }

  rightClick() {
    if (this.numOfCurrImg === this.numOfImages - 1) {
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
