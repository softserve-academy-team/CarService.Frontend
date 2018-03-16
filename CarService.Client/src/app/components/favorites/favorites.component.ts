import { BaseCarInfo } from './../../models/base-car-info';
import { Component, OnInit } from '@angular/core';
import { ProfileService } from './../../services/profile.service';


@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  cars: BaseCarInfo[];

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.getAllCarsFromFavorites();
  }

  getAllCarsFromFavorites() {
    this.profileService.getAllCarsFromFavorites().subscribe((data) =>
      this.cars = data);
  }
}
