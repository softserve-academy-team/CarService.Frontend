import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule, FormBuilder, Validators, FormControl, AbstractControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  form: FormGroup;
  email: AbstractControl;
  password: AbstractControl;
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private snackBar: MatSnackBar) {
    this.form = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('^([a-zA-Z0-9@*#]{4,15})$')]]
    })

    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
  }

  signIn() {
    this.authService.signIn(this.form.value).subscribe((data: any) => {
      localStorage.setItem('token', data.access_token);
      this.router.navigate(['']);
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
          this.openSnackBar(`${err.error}`, "Ok");
        }
      }
    );
  }

  openSnackBar(body: string, button: string) {
    this.snackBar.open(body, button, {
      duration: 5000,
      verticalPosition: this.verticalPosition
    });
  }
}
