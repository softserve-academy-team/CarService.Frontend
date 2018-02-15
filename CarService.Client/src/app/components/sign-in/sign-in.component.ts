import { FormsModule, FormBuilder, Validators, FormControl, AbstractControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  form: FormGroup;
  email: AbstractControl;
  password: AbstractControl;

  constructor(private fb: FormBuilder, private auth: AuthService) {
      this.form = fb.group({
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.pattern('^([a-zA-Z0-9@*#]{8,15})$')]]
      })

      this.email = this.form.controls['email'];
      this.password = this.form.controls['password'];
  }

  register(){
  }

}
