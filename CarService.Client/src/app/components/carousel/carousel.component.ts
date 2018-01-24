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

images: any[] = [
  {
    'src' : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz8sM2JwU9mGJn7cCSToAP_yNyYAhW1OGNi3Y7DE3fVlVumdqfgw'
  },
  {
    'src' : 'http://service.kzta.ru/wp-content/uploads/2015/02/time-300x300.png'
  },
  {
    'src' : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4GP8C9ZfCZ_sQFEIboThkLSo86LyZ8PsIgnzINdt1Hh-7spbW8w'
  }
];

  constructor() { }

  ngOnInit() {
    this.numOfImages = this.images.length;
    this.numOfCurrImg = 0;
    this.time = 4000;
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
