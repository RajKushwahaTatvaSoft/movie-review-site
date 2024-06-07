import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, last, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly databaseUrl = 'https://localhost:7048/api/User';
  constructor(private http: HttpClient) {}

  registerNewUser(formData: any) {
    const url = `${this.databaseUrl}/AddUser`;
    return this.http.post<any>(url, formData);
  }

  async loginUser(formData: any) {
    console.log(formData);
    const url = `${this.databaseUrl}/UserLogin`;
   
    let request = this.http.post<any>(url, formData).pipe(map(res => res));
    let data = await firstValueFrom(request);

    if(data.isSuccess == true){
      let jwt = data.result.token;
      let firstName = data.result.loggedInUser.firstName;
      let lastName = data.result.loggedInUser.lastName;
      localStorage.setItem("userToken",jwt);
      localStorage.setItem("userFullName",`${firstName} ${lastName}`);
      return true;
    }
    else{
      return false;
    }
  }

  logoutUser(){
    localStorage.setItem("userToken",'');
    localStorage.setItem("userFullName",'');
  }
}