import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { RegistrationConfig } from '../../config-models/registration-config';
import { PasswordValidation } from '../../validation/password-validation';
import { CustomerEditData } from '../../models/customer-edit-data';
import { MechanicEditData } from '../../models/mechanic-edit-data';
import { UserDTO } from '../../models/userDTO';
import { ProfileService } from '../../services/profile.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from '../../services/auth.service';

declare let require: any;

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  private user: UserDTO;
  
  private maxSpecializationLength = 40; 
  private cardNumberLength = 16; 

  private toRegexRange = require('to-regex-range');

  private readonly config: RegistrationConfig;

  private editFormGroup: FormGroup;

  private firstName: AbstractControl;
  private lastName: AbstractControl;
  private city: AbstractControl;
  private phoneNumber: AbstractControl;
  private cardNumber: AbstractControl;
  private experience: AbstractControl;
  private specialization: AbstractControl;

  private isMechanic: boolean;

  constructor(private formBuilder: FormBuilder,
    private passwordValidation: PasswordValidation,
    private profileService: ProfileService,
    private router: Router,
    private authService: AuthService) { 
      this.config = environment["RegistrationConfig"];
    }

  ngOnInit() {
    this.getUserInfo();
  }

  private getUserInfo() {
    this.profileService.getUserInfo(this.authService.userEmail).subscribe((data: UserDTO) => {
      this.user = data;
      this.editFormGroup = this.getEditFormGroup();

      this.firstName = this.editFormGroup.controls.firstName;
      this.lastName = this.editFormGroup.controls.lastName;
      this.city = this.editFormGroup.controls.city;
      this.phoneNumber = this.editFormGroup.controls.phoneNumber;
      this.cardNumber = this.editFormGroup.controls.cardNumber;

      if (this.user.workExperience != undefined) {
        this.isMechanic = true;
        this.experience = this.editFormGroup.controls.experience;
        this.specialization = this.editFormGroup.controls.specialization;
      }
      else {
        this.isMechanic = false;
        this.disableMechanicFormControls();
      }

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

  private getEditFormGroup(): FormGroup {
    return this.formBuilder.group({
      firstName: this.getTextFormControl(this.user.firstName),
      lastName: this.getTextFormControl(this.user.lastName),
      city: this.getTextFormControl(this.user.city),
      phoneNumber: this.getPhoneNumberFormControl(this.user.phoneNumber),
      cardNumber: this.getCardNumberFormControl(this.user.cardNumber),
      experience: this.getExperienceFormControl(this.user.workExperience),
      specialization: this.getSpecializationFormControl(this.user.specialization)
    });
  }

  private getTextFormControl(initValue: string): FormControl {
    return new FormControl(initValue, [
      Validators.required,
      Validators.minLength(this.config.textMinLength),
      Validators.maxLength(this.config.textMaxLength)
    ]);
  }

  private getSpecializationFormControl(initValue: string): FormControl {
    return new FormControl(initValue, [
      Validators.required,
      Validators.minLength(this.config.textMinLength),
      Validators.maxLength(this.maxSpecializationLength)
    ]);
  }

  private getCardNumberFormControl(initValue: string): FormControl {
    return new FormControl(initValue, [
      Validators.required,
      Validators.pattern("[0-9]{16}"),
      Validators.maxLength(this.cardNumberLength)
    ]);
  }

  private getPhoneNumberFormControl(initValue: string): FormControl {
    return new FormControl(initValue, [
      Validators.required,
      Validators.pattern(/\+38[0-9]{10}/),
      Validators.maxLength(13)
    ]);
  }

  private getExperienceFormControl(initValue: number): FormControl {
    return new FormControl(initValue, [
      Validators.required,
      Validators.pattern(this.getExperienceFieldPattern())
    ]);
  }

  private getExperienceFieldPattern(): string {
    return "(" + this.toRegexRange(this.config.experienceMinValue, this.config.experienceMaxValue) + ")";
  }

  private disableMechanicFormControls() {
    this.editFormGroup.controls.experience.disable();
    this.editFormGroup.controls.specialization.disable();
  }

  private createCustomerData(): CustomerEditData {
    let customer = new CustomerEditData();
    customer.email = this.user.email;
    customer.firstName = this.firstName.value;
    customer.lastName = this.lastName.value;
    customer.city = this.city.value;
    customer.phoneNumber = this.phoneNumber.value;
    customer.cardNumber = this.cardNumber.value;
    return customer;
  }
  private createMechanicData(): MechanicEditData {
    let mechanic = new MechanicEditData();
    mechanic.email = this.user.email;
    mechanic.firstName = this.firstName.value;
    mechanic.lastName = this.lastName.value;
    mechanic.city = this.city.value;
    mechanic.phoneNumber = this.phoneNumber.value;
    mechanic.cardNumber =  this.cardNumber.value;
    mechanic.workExperience = this.experience.value;
    mechanic.specialization = this.specialization.value;
    return mechanic;
  }

  save() {
    if (this.editFormGroup.valid) {
      if (this.isMechanic) {
        let mechanic = this.createMechanicData();
        this.profileService.editMechanic(mechanic).subscribe(data => {
        },
          (err: HttpErrorResponse) => {
            if (err.error instanceof Error) {
              console.log('An error occurred:', err.error.message);
            } else {
              console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
            }
          }
        );
      } else {
        let customer = this.createCustomerData();
        this.profileService.editCustomer(customer).subscribe(data => {
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
      this.router.navigate(['../profile']);
    } else {
      console.log("Input data error.");
    }
  }
}
