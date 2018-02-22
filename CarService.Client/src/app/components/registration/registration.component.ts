import { Component } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { RegistrationConfig } from '../../config-models/registration-config';
import { PasswordValidation } from '../../validation/password-validation';
import { RegistrationService } from '../../services/registration.service';
import { CustomerRegistrationData } from '../../models/customer-registration-data';
import { MechanicRegistrationData } from '../../models/mechanic-registration-data';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

declare let require: any;

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

  private toRegexRange = require('to-regex-range');

  private readonly config: RegistrationConfig;

  private registrationFormGroup: FormGroup;

  private firstName: AbstractControl;
  private lastName: AbstractControl;
  private location: AbstractControl;
  private email: AbstractControl;
  private password: AbstractControl;
  private confirmPassword: AbstractControl;
  private experience: AbstractControl;
  private specialization: AbstractControl;

  private isMechanic: boolean;

  constructor(private formBuilder: FormBuilder,
    private passwordValidation: PasswordValidation,
    private registrationService: RegistrationService,
    private router: Router,
    private snackBar: MatSnackBar) {

    this.config = environment["RegistrationConfig"];

    this.registrationFormGroup = this.getRegistrationFormGroup();
    this.disableMechanicFormControls();

    this.firstName = this.registrationFormGroup.controls.firstName;
    this.lastName = this.registrationFormGroup.controls.lastName;
    this.location = this.registrationFormGroup.controls.location;
    this.email = this.registrationFormGroup.controls.email;
    this.password = this.registrationFormGroup.controls.password;
    this.confirmPassword = this.registrationFormGroup.controls.confirmPassword;
    this.experience = this.registrationFormGroup.controls.experience;
    this.specialization = this.registrationFormGroup.controls.specialization;

    this.isMechanic = false;
  }

  private getRegistrationFormGroup(): FormGroup {
    return this.formBuilder.group({
      firstName: this.getTextFormControl(),
      lastName: this.getTextFormControl(),
      location: this.getTextFormControl(),
      email: this.getEmailFormControl(),
      password: this.getPasswordFormControl(),
      confirmPassword: this.getPasswordFormControl(),
      experience: this.getExperienceFormControl(),
      specialization: this.getTextFormControl()
    }, {
        validator: PasswordValidation.MatchPassword
      });
  }

  private disableMechanicFormControls() {
    this.registrationFormGroup.controls.experience.disable();
    this.registrationFormGroup.controls.specialization.disable();
  }
  private enableMechanicFormControls() {
    this.registrationFormGroup.controls.experience.enable();
    this.registrationFormGroup.controls.specialization.enable();
  }

  private getTextFormControl(): FormControl {
    return new FormControl('', [
      Validators.required,
      Validators.minLength(this.config.textMinLength),
      Validators.maxLength(this.config.textMaxLength)
    ]);
  }
  private getEmailFormControl(): FormControl {
    return new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.minLength(this.config.textMinLength),
      Validators.maxLength(this.config.textMaxLength)
    ]);
  }
  private getPasswordFormControl(): FormControl {
    return new FormControl('', [
      Validators.required,
      Validators.minLength(this.config.textMinLength),
      Validators.maxLength(this.config.textMaxLength)
    ]);
  }
  private getExperienceFormControl(): FormControl {
    return new FormControl('', [
      Validators.required,
      Validators.pattern(this.getExperienceFieldPattern())
    ]);
  }

  private getExperienceFieldPattern(): string {
    return "(" + this.toRegexRange(this.config.experienceMinValue, this.config.experienceMaxValue) + ")";
  }

  private createCustomer(): CustomerRegistrationData {
    let customer = new CustomerRegistrationData();
    customer.firstName = this.firstName.value;
    customer.lastName = this.lastName.value;
    customer.location = this.location.value;
    customer.email = this.email.value;
    customer.password = this.password.value;
    return customer;
  }
  private createMechanic(): MechanicRegistrationData {
    let mechanic = new MechanicRegistrationData();
    mechanic.firstName = this.firstName.value;
    mechanic.lastName = this.lastName.value;
    mechanic.location = this.location.value;
    mechanic.email = this.email.value;
    mechanic.password = this.password.value;
    mechanic.experience = this.experience.value;
    mechanic.specialization = this.specialization.value;
    return mechanic;
  }

  register() {
    if (this.registrationFormGroup.valid) {
      if (this.isMechanic) {
        let mechanic = this.createMechanic();
        console.log(mechanic);
        this.registrationService.registerMechanic(mechanic).subscribe(data => {
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
        let customer = this.createCustomer();
        console.log(customer);
        this.registrationService.registerCustomer(customer).subscribe(data => {
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
      this.router.navigate([''])
    } else {
      console.log("Input data error.");
    }
    this.openSnackBar();
  }
  changeRegistrationForm() {
    this.isMechanic = !this.isMechanic;
    if (this.isMechanic) {
      this.enableMechanicFormControls();
    } else {
      this.disableMechanicFormControls();
    }
  }

  openSnackBar() {
    this.snackBar.open("Confirm registration by email", "Ok", {
      duration: 5000
    });
  }
}
