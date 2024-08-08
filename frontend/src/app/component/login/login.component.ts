import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}
  loginData?: any;
  isSubmitted: boolean = false;
  statusCode: number = 0;

  emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.pattern(this.emailPattern)],
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
    }),
  });

  checkInvalidEmail() {
    return (this.form.controls.email.touched &&
      this.form.controls.email.errors) ||
      (this.form.invalid && this.isSubmitted)
      ? true
      : false;
  }

  checkInvalidPassword() {
    return (this.form.controls.password.touched &&
      this.form.controls.password.errors) ||
      (this.form.invalid && this.isSubmitted)
      ? true
      : false;
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) return;
    this.authService.getUser(this.form).subscribe(
      (val) => {
        this.loginData = val;
        this.statusCode = this.loginData.status;
        localStorage.setItem('token', this.loginData.token);
        this.router.navigate(['/']);
      },
      (err) => {
        this.statusCode = err.status;
      }
    );
  }
}
