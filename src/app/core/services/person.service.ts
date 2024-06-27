import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom, map, take } from 'rxjs';
import { MovieTileComponent } from '../../shared/components/movie-tile/movie-tile.component';
import { EnvironmentConfig } from '../config/environment';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  private readonly databaseUrl = `${EnvironmentConfig.apiUrl}/MovieInfo`;
  private readonly personUrl = `${this.databaseUrl}/Person`;

  constructor(private http: HttpClient) {}


  fetchPersonListForSuggestion(searchInput:string){

    const params = new HttpParams()
      .set('searchInput', searchInput);

    const url = `${this.personUrl}/FetchPersonByName`;
    return this.http.get<any>(url, {
      params,
    });
  }

  fetchPersonDetailById(personId:number){
    const url = `${this.personUrl}/FetchPersonById/${personId}`;
    return this.http.get<any>(url);
  }


}
