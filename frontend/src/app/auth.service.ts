import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) { } // creating/requesting http client

  url: string = 'http://localhost:3000/user/';

  getUser(event: any) {
    return this.http.post(this.url + 'login/', event.value);
  }

  // POST request
  register(event: any) {
    return this.http.post(this.url + 'register/', event.value);
  }

  changePassword(event: any) {
    return this.http.patch(this.url + 'change-password/', event.value);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
