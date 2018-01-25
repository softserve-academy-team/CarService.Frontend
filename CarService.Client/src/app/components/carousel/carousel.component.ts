import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

numOfCurrImg: number;
numOfImages: number;
time: number;
hide: boolean;

images: any[] = [
 
  {
    'src' : 'assets/car_service_1.jpg'
  },
  {
    'src' : 'assets/car_service_2.jpg'
  },
  {
    'src' : 'assets/car_service_3.jpg'
  },
  {
    'src' : 'assets/car_service_4.jpg'
  },
  {
    'src' : 'assets/car_service_5.jpg'
  },
  {
    'src' : 'assets/car_service_6.jpg'
  }
];

  constructor() { }

  ngOnInit() {
    this.numOfImages = this.images.length;
    this.numOfCurrImg = 0;
    this.time = 4000;
    this.hide = true;
    // this.changeImageSourceWithInterval();
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
