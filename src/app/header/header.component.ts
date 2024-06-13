import { Component, Inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MovieService } from '../core/services/movie.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  userName: string;
  movieSearchName: string = '';
  movieSearchList: { movieId: number; title: string }[] = [];
  isShowSearchResults = false;
  isAdmin = false;

  constructor(
    private authService: AuthService,
    private movieService: MovieService,
    @Inject(Router) private router: Router
  ) {
    this.userName = localStorage.getItem('userFullName') || '';
    this.isAdmin = authService.isAdmin();
  }

  goToAddMovie() {
    this.router.navigate(['admin','add-movie']);
  }

  logoutUser() {
    this.authService.logoutUser();
    this.router.navigate(['login']);
  }

  searchMovieByName() {
    this.movieSearchList = [];
    if (this.movieSearchName == '') {
      this.router.navigate(['home']);
      return;
    }
    let str = this.movieSearchName.replaceAll(' ', '-');
    this.router.navigate(['search', str]);
  }

  updateSearch(value: string) {
    this.movieSearchName = value;
  }

  goDirectToMovie(movieId: number, movieName: string) {
    debugger;
    this.movieSearchList = [];
    this.movieSearchName = movieName;
    let str = this.movieSearchName.replaceAll(' ', '-');
    this.router.navigate(['search', str, 'movie', movieId]);
  }

  fetchSuggestions(event: any) {
    this.isShowSearchResults = true;
    let search: string = event.target.value;

    this.movieSearchName = search;

    if (search == null || search == '') {
      this.movieSearchList = [];
      return;
    }

    this.movieService
      .fetchMovieSuggestions(event.target.value)
      .subscribe((data: any) => {
        this.movieSearchList = data.result;
      });
  }
}
