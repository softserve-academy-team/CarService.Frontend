import { Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { DetailCarInfo } from '../../models/detail-car-info';
import { CarService } from '../../services/car.service';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.scss']
})
export class CarDetailComponent implements OnInit {

  private detailCarById: DetailCarInfo;
  private carPhotosAll: Array<string> = [];

  constructor(
    private route: ActivatedRoute,
    private carService: CarService,
    private profileService: ProfileService
  ) { }

  ngOnInit() {
    this.getDetailCarById();
    this.getCarPhotos();
  }

  getDetailCarById(): void{
    this.carService.getDetailCarById(+this.route.snapshot.paramMap.get('id')).subscribe((data: DetailCarInfo) => {
      this.detailCarById = data;
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

  getCarPhotos(): void{
    this.carService.getCarPhotos(+this.route.snapshot.paramMap.get('id')).subscribe(
      value => this.carPhotosAll = value
    );
  }

  addCarToFavourites(): void{
    this.profileService.addCarToFavorites(+this.route.snapshot.paramMap.get('id'), this.detailCarById.description).subscribe(data => {
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
