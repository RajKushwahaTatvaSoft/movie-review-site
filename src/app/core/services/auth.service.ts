import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly databaseUrl = 'https://localhost:7048/api/User';
  constructor(private http: HttpClient, private router: Router) {}

  registerNewUser(formData: any) {
    const url = `${this.databaseUrl}/AddUser`;
    return this.http.post<any>(url, formData);
  }

  isAdmin(): boolean {
    if (
      localStorage.getItem('userToken') &&
      parseInt(localStorage.getItem('userRole') || '0') == 2
    ) {
      return true;
    }
    return false;
  }

  isUser(): boolean {
    if (
      localStorage.getItem('userToken') &&
      parseInt(localStorage.getItem('userRole') || '0') == 1
    ) {
      return true;
    } else {
      return false;
    }
  }

  hasToken(): boolean {
    if (localStorage.getItem('userToken')) {
      return true;
    } else {
      return false;
    }
  }

  async loginUser(formData: any) {
    console.log(formData);
    const url = `${this.databaseUrl}/UserLogin`;

    let request = this.http.post<any>(url, formData).pipe(map((res) => res));
    let data = await firstValueFrom(request);

    if (data.isSuccess == true) {
      let jwt = data.result.token;
      let firstName = data.result.loggedInUser.firstName;
      let lastName = data.result.loggedInUser.lastName;
      let userRole = data.result.loggedInUser.roleId;
      localStorage.setItem('userToken', jwt);
      localStorage.setItem('userRole', userRole);
      localStorage.setItem('userFullName', `${firstName} ${lastName}`);
      return true;
    } else {
      return false;
    }
  }

  logoutUser() {
    debugger;
    localStorage.removeItem('userToken');
    localStorage.removeItem('userFullName');
    this.router.navigate(['login']);
  }
}
