import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router, RouterLink } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, HeaderComponent],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css',
})
export class ChangePasswordComponent {
  constructor(private authService: AuthService, private router: Router) {}
  loginData?: any;
  statusCode: number = 0;

  form = new FormGroup({
    oldPassword: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
    }),
    newPassword: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
    }),
  });

  checkInvalidOldPassword() {
    return this.form.controls.oldPassword.touched &&
      this.form.controls.oldPassword.errors
      ? true
      : false;
  }

  checkInvalidNewPassword() {
    return this.form.controls.newPassword.touched &&
      this.form.controls.newPassword.errors
      ? true
      : false;
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.authService.changePassword(this.form).subscribe((val) => {
      this.loginData = val;
      console.log(this.loginData);
      this.statusCode = this.loginData.status;
      if (this.statusCode == 202) this.router.navigate(['/']);
    });
  }
}
