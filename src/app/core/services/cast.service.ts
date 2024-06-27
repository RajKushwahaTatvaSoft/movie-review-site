import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom, map, take } from 'rxjs';
import { MovieTileComponent } from '../../shared/components/movie-tile/movie-tile.component';
import { EnvironmentConfig } from '../config/environment';
import { Genre } from '../../shared/models/genre.model';
import { CastItem } from '../../admin/movie-management/movie-management.component';

@Injectable({
  providedIn: 'root',
})
export class CastService {
  private readonly databaseUrl = `${EnvironmentConfig.apiUrl}/MovieInfo`;
  private readonly castUrl = `${this.databaseUrl}/Cast`;

  constructor(private http: HttpClient) {}

  addCastToMovieById(movieId: number, castItems: CastItem[]) {

    const url = `${this.castUrl}/AddCastDetailToMovie/${movieId}`;
    let castList: { personId: number; characterName: string | null }[] = [];

    castItems.forEach((data) => {
      castList.push({
        personId: data.selectedPerson[0].personId,
        characterName: data.characterName,
      });
    });

    return this.http.post<any>(url, castList);
  }

  fetchPaginatedCastList(searchInput:string,pageNumber:number,pageSize:number){
    
    const params = new HttpParams()
      .set('pageNumber', pageNumber)
      .set('searchActorName',searchInput)
      .set('pageSize', pageSize);

    const url = `${this.castUrl}/GetPaginatedCastList`;
    return this.http.get<any>(url, {
      params,
    });
  }

  getMoviesStaredInById(personId : number){

    // const params = new HttpParams()
    //   .set('pageNumber', pageNumber)
    //   .set('pageSize', pageSize);

    const url = `${this.castUrl}/GetMoviesStaredIn/${personId}`;
    return this.http.get<any>(url);
  }
}
