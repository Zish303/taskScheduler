import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private cookieService: CookieService, private router: Router) {}
  jwtToken?: string;
  decodedToken?: any;

  canActivate(): boolean {
    const token = localStorage.getItem('token');

    if (token != '' && token != null) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
