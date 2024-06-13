import { Injectable } from '@angular/core';
import { EnvironmentConfig } from '../../config/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  private readonly databaseUrl = `${EnvironmentConfig.apiUrl}/api/MovieAPI`;


}
