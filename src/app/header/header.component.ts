import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { FormsModule } from '@angular/forms';
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
  userProfileUrl : string;
  movieSearchName: string = '';
  movieSearchList: { movieId: number; title: string }[] = [];
  isShowSearchResults = false;
  isUserProfileLoaded = false;

  constructor(
    private authService: AuthService,
    private movieService: MovieService,
    @Inject(Router) private router: Router,
    private route: ActivatedRoute
  ) {
    this.userName = localStorage.getItem('userFullName') || '';
    this.userProfileUrl = localStorage.getItem('userProfileUrl') || '';
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
    console.log('start');
    this.movieSearchName = movieName;
    let str = this.movieSearchName.replaceAll(' ', '-');
    this.router.navigate(['search', str, 'movie', movieId]);
    this.movieSearchList = [];
    console.log('end');
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

  goToProfile() {
    this.router.navigate(['home','profile']);
  }
}
