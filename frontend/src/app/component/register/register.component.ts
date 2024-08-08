import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  constructor(private authService: AuthService, private router: Router) {}
  registerData?: any;
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
    return this.form.controls.email.touched && this.form.controls.email.errors
      ? true
      : false;
  }

  checkInvalidPassword() {
    return this.form.controls.password.touched &&
      this.form.controls.password.errors
      ? true
      : false;
  }

  onSubmit() {
    if (this.form.invalid) return;
    console.log(this.form.value);
    this.authService.register(this.form).subscribe(
      (val) => {
        this.registerData = val;
        localStorage.setItem('token', this.registerData.token);
        this.router.navigate(['/']);
      },
      (err) => {
        this.statusCode = err.status;
      }
    );
  }
}
