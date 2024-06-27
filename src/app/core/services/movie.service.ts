import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom, map, take } from 'rxjs';
import { MovieTileComponent } from '../../shared/components/movie-tile/movie-tile.component';
import { EnvironmentConfig } from '../config/environment';
import { Genre } from '../../shared/models/genre.model';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private readonly databaseUrl = `${EnvironmentConfig.apiUrl}/MovieInfo`;
  private readonly movieUrl = `${this.databaseUrl}/Movie`;
  private readonly reviewUrl = `${this.databaseUrl}/Review`;

  constructor(private http: HttpClient) {}
  
  getMovieReleasedByYear(){
    
    const params = new HttpParams()
      .set('pageNumber', 1)
      .set('pageSize', 10);

    const url = `${this.movieUrl}/GetMoviesReleasedByYear`;
    return this.http.get<any>(url, {
      params,
    });
  }

  getAvgBudgetAndRevenueByYear(){
    
    const params = new HttpParams()
      .set('pageNumber', 1)
      .set('pageSize', 10);

    const url = `${this.movieUrl}/GetAvgBudgetAndRevenueYear`;
    return this.http.get<any>(url, {
      params,
    });
  }

  

  getMoviesByFilters(
    category: number,
    searchName: string,
    pageNumber: number,
    pageSize: number
  ) {
    debugger;
    const params = new HttpParams()
      .set('category', category)
      .set('searchName', searchName)
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);

    const url = `${this.movieUrl}/GetMovies`;
    return this.http.get<any>(url, {
      params,
    });
  }

  getDeletedMoviesByFilters(
    category: number,
    searchName: string,
    pageNumber: number,
    pageSize: number
  ) {
    debugger;
    const params = new HttpParams()
      .set('category', category)
      .set('searchName', searchName)
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);

    const url = `${this.movieUrl}/GetDeletedMovies`;
    return this.http.get<any>(url, {
      params,
    });
  }

  deleteMovieById(movieId: number) {
    debugger;
    const url = `${this.movieUrl}/DeleteMovie/${movieId}`;
    return this.http.delete(url);
  }

  restoreMovieById(movieId: number) {
    debugger;
    const url = `${this.movieUrl}/RestoreMovie/${movieId}`;
    return this.http.delete(url);
  }

  updateMovie(formData: any) {
    const url = `${this.movieUrl}/UpdateMovie`;
    return this.http
      .put(url, formData)
      .pipe(take(1))
      .subscribe((data) => {
        console.log(data);
      });
  }

  fetchMovieSuggestions(search: string) {
    const params = new HttpParams().set('searchInput', search);
    const url = `${this.movieUrl}/GetSuggestionForMovieSearch`;
    return this.http.get(url, { params });
  }
  fetchDetailsFromOmdb(movieId: string) {
    // var url = `http://www.omdbapi.com/?apikey=c969315c&i=${movieId}`;

    const url = `${this.movieUrl}/GetDetailFromOMDB`;
    const params = new HttpParams().set('imdbId',movieId);

    return this.http.get(url,{params});
  }

  addMovieToDb(formData: any) {
    console.log(formData);
    const url = `${this.movieUrl}/AddMovie`;
    return this.http
      .post(url, formData);
  }

  updateMovieDataFromOmdb() {
    const url = `${this.movieUrl}/UpdateMovieDataFromOMDB`;
    this.http
      .post(url, MovieTileComponent.problemImagesMovieId)
      .pipe(take(1))
      .subscribe();
    return;
  }

  fetchMovieByName(movieName: string, pageNumber: number, pageSize?: number) {
    if (!pageSize) {
      pageSize = 6;
    }

    const params = new HttpParams()
      .set('movieName', movieName)
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);

    const url = `${this.movieUrl}/GetMovieByName`;
    return this.http.get<any>(url, {
      params,
    });
  }

  fetchSelfReviewForMovie(movieId: number) {
    const url = `${this.reviewUrl}/GetUserSelfReview/${movieId}`;
    return this.http.get(url);
  }

  fetchMovieReviews(movieId: number, pageNumber: number, pageSize?: number) {
    if (!pageSize) {
      pageSize = 6;
    }

    const params = new HttpParams()
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);

    const url = `${this.reviewUrl}/GetMovieReviews/${movieId}`;
    return this.http.get(url, { params });
  }

  async addMovieReview(movieId: number, rating: number, description: string) {
    debugger;
    let formData = {
      movieId,
      rating,
      description,
    };

    const url = `${this.reviewUrl}/AddReview`;

    let request = this.http.post<any>(url, formData).pipe(map((res) => res));
    let data = await firstValueFrom(request);

    if (data.isSuccess == true) {
      console.log('success');
    } else {
      console.log('error');
    }
  }

  async updateMovieReview(
    movieId: number,
    rating: number,
    description: string,
    ratingId: number
  ) {
    debugger;
    let formData = {
      movieId,
      rating,
      description,
    };

    const url = `${this.reviewUrl}/UpdateReview/${ratingId}`;

    let request = this.http.put<any>(url, formData).pipe(map((res) => res));
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

    const url = `${this.movieUrl}/GetMovieByCategory`;
    return this.http.get<any>(url, {
      params,
    });
  }

  fetchMovieDetailById(movieId: number): any {
    const url = `${this.movieUrl}/GetMovieById/${movieId}`;
    return this.http.get(url);
  }

  async getGenreList(): Promise<Genre[]> {
    const url = `${this.movieUrl}/GetGenres`;

    let request = this.http.get<any>(url).pipe(map((res) => res));
    let response = await firstValueFrom(request);

    debugger;
    return response.result;
  }
}
