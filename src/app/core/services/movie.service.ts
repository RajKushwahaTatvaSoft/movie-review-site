import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom, map, take } from 'rxjs';
import { MovieTileComponent } from '../../shared/components/movie-tile/movie-tile.component';
import { EnvironmentConfig } from '../../config/environment';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  
  private readonly databaseUrl = `${EnvironmentConfig.apiUrl}/api/MovieAPI`;
  private authenticationHeader: HttpHeaders;

  constructor(private http: HttpClient) {
    let token = localStorage.getItem('userToken') || '';
    this.authenticationHeader = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + token
    );
  }

  fetchMovieSuggestions(search:string){
    const params = new HttpParams().set('searchInput',search);
    const url = `${this.databaseUrl}/GetSuggestionForMovieSearch`;
    return this.http.get(url,{params,headers: this.authenticationHeader});
  }
  fetchDetailsFromOmdb(movieId:string){    
    var url = `http://www.omdbapi.com/?apikey=c969315c&i=${movieId}`;

    let movieData = {
      title : '',
      releasedate: '',
      duration: '',
      posterurl:'',
      imdbid:'',
      revenue: '',
      budget: '',
      overview: '',
      plot: '',
      writer: '',
      actor: '',
      director:'',
      author: '',
    };

    return this.http.get(url);
  }

  addMovieToDb(formData:any){
    console.log(formData);
    const url = `${this.databaseUrl}/AddMovie`;
    return this.http.post(url,formData,{headers: this.authenticationHeader}).pipe(take(1)).subscribe((data)=> {
      console.log(data);
    });
  }

  updateMovieDataFromOmdb(){
    const url = `${this.databaseUrl}/UpdateMovieDataFromOMDB`;
    this.http.post(url,MovieTileComponent.problemImagesMovieId).pipe(take(1)).subscribe();
    return;
  }

  fetchMovieByName(
    movieName: string,
    pageNumber: number,
    pageSize?: number
  ) {
    if (!pageSize) {
      pageSize = 6;
    }

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
    rating: number,
    description: string
  ) {
    debugger;
    let formData = {
      movieId,
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
