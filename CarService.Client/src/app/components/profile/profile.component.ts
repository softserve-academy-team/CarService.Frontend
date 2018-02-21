import { Component, OnInit } from '@angular/core';
import { UserDTO } from '../../models/userDTO';
import { ProfileService } from '../../services/profile.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  private user: UserDTO;
  private userInfo: Element[];
  dataSource = new MatTableDataSource(this.userInfo);

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.getUserInfo();
  }

  private getUserInfo() {
    this.profileService.getUserInfo().subscribe((data: UserDTO) => {
      this.user = data;
      this.userInfo = [
        {name: "First Name", value: this.user.firstName},
        {name: "Last Name", value: this.user.lastName},
        {name: "Email", value: this.user.email},
        {name: "Phone Number", value: this.user.phoneNumber},
        {name: "City", value: this.user.city},
        {name: "Card Number", value: this.user.cardNumber}
      ];

      if (this.user.workExperience != undefined)
      {
        this.userInfo.push({name: "Work Experience", value: this.user.workExperience.toString()});
        this.userInfo.push({name: "Specialization", value: this.user.specialization});
        this.userInfo.push({name: "Rate", value: this.user.mechanicRate.toString()});
      }

      console.log(this.userInfo);
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

class Element {
  name: string;
  value: string;
}

