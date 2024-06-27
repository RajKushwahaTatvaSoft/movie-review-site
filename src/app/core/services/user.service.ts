import { Injectable } from '@angular/core';
import { EnvironmentConfig } from '../config/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly databaseUrl = `${EnvironmentConfig.apiUrl}/MovieInfo`;
  private readonly userUrl = `${this.databaseUrl}/User`;

  constructor(private http: HttpClient) {}

  updateUserProfile(userProfileData: any) {
    const url = `${this.userUrl}/UploadUserProfilePhoto`;
    return this.http.put<any>(url, userProfileData);
  }
  updateUserProfileDetail(userProfileDetails: any) {
    const url = `${this.userUrl}/UpdateUserProfileDetail`;
    return this.http.put<any>(url, userProfileDetails);
  }

  updateUserDetail(userData: any) {
    const url = `${this.userUrl}/UpdateUserDetails`;
    return this.http.put<any>(url, userData);
  }

  getUsers(pageNumber: number, pageSize: number) {
    debugger;
    const params = new HttpParams()
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);

    const url = `${this.userUrl}/GetUsers`;
    return this.http.get<any>(url, {
      params,
    });
  }

  fetchUserById(userId: number) {
    const url = `${this.userUrl}/GetUserById/${userId}`;
    return this.http.get<any>(url);
  }

  fetchUserRoles() {
    const url = `${this.userUrl}/GetRoles`;
    return this.http.get<any>(url);
  }

  deleteUser(userId: number) {
    const url = `${this.userUrl}/DeleteUser/${userId}`;
    return this.http.delete<any>(url);
  }

  // Methods for deleted Users

  restoreUser(userId: number) {
    const url = `${this.userUrl}/RestoreUser/${userId}`;
    return this.http.get<any>(url);
  }

  fetchDeletedUsers(pageNumber: number, pageSize: number) {
    debugger;
    const params = new HttpParams()
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);

    const url = `${this.userUrl}/GetDeletedUsers`;
    return this.http.get<any>(url, {
      params,
    });
  }

  fetchUserProfile() {
    const url = `${this.userUrl}/GetUserProfile`;
    return this.http.get<any>(url);
  }
}
