import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private readonly databaseUrl = 'https://localhost:7048/api/MovieAPI';
  private readonly tmdbUrl = 'https://image.tmdb.org/t/p/original';
  private readonly OMDB_API_KEY = 'c969315c';
  private readonly OMDB_URL = 'http://www.omdbapi.com';
  private authenticationHeader: HttpHeaders;

  constructor(private http: HttpClient) {
    let token = localStorage.getItem('userToken') || '';
    this.authenticationHeader = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + token
    );
  }

  fetchMovieByName(
    movieName: string,
    pageNumber: number,
    pageSize?: number
  ) {
    if (!pageSize) {
      pageSize = 6;
    }

    debugger;
    const params = new HttpParams()
      .set('movieName', movieName)
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);

    const url = `${this.databaseUrl}/GetMovieByName`;
    return this.http.get<any>(url, { params,headers: this.authenticationHeader });
  }

  fetchMovieReviews(movieId: number,pageNumber:number, pageSize?:number) {
    
    if (!pageSize) {
      pageSize = 6;
    }
    
    const params = new HttpParams()
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);

    const url = `${this.databaseUrl}/GetMovieReviews/${movieId}`;
    return this.http.get(url,{headers:this.authenticationHeader, params});
  }

  async addMovieReview(
    movieId: number,
    userId: number,
    rating: number,
    description: string
  ) {
    debugger;
    let formData = {
      movieId,
      userId,
      rating,
      description,
    };

    const url = `${this.databaseUrl}/AddReview`;

    let request = this.http.post<any>(url, formData,{headers:this.authenticationHeader}).pipe(map((res) => res));
    let data = await firstValueFrom(request);

    if (data.isSuccess == true) {
      console.log('success');
    } else {
      console.log('error');
    }
  }

  fetchMovieByCategory(
    category: string,
    pageNumber: number,
    pageSize?: number
  ) {
    if (!pageSize) {
      pageSize = 6;
    }

    const params = new HttpParams()
      .set('category', category)
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);

    const url = `${this.databaseUrl}/GetMovieByCategory`;
    return this.http.get<any>(url, { params,headers: this.authenticationHeader });
  }

  fetchMovieDetailById(movieId: number): any {
    const url = `${this.databaseUrl}/GetMovieById/${movieId}`;
    return this.http.get(url,{headers:this.authenticationHeader});
  }

  fetchMovieGenres(): Observable<any> {

    const url = `${this.databaseUrl}/GetGenres`;

    return this.http.get(url, {
      headers: this.authenticationHeader,
    });
  }
}
