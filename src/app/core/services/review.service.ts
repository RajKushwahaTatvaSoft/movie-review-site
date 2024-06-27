import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom, map, take } from 'rxjs';
import { MovieTileComponent } from '../../shared/components/movie-tile/movie-tile.component';
import { EnvironmentConfig } from '../config/environment';
import { Genre } from '../../shared/models/genre.model';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private readonly databaseUrl = `${EnvironmentConfig.apiUrl}/MovieInfo/Review`;

  constructor(private http: HttpClient) {}
 
}
