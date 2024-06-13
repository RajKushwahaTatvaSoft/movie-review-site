import { CommonModule } from '@angular/common';
import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { MovieService } from '../../core/services/movie.service';
import { MovieTileComponent } from '../../shared/components/movie-tile/movie-tile.component';
import { Movie } from '../../shared/models/movie.model';
import { Router } from '@angular/router';
import { ShimmerListComponent } from '../../shimmer-list/shimmer-list.component';

@Injectable()
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MovieTileComponent, ShimmerListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  trendingMovies: Movie[] = [];
  categoryThreeMovies: Movie[] = [];
  categoryOneMovies: Movie[] = [];
  categoryTwoMovies: Movie[] = [];
  genreList: any[] = [];
  homePageGenreList: string[] = ['Comedy', 'Action', 'Thriller'];

  constructor(
    private movieService: MovieService,
    @Inject(Router) private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.movieService
      .fetchMovieByCategory('trending', 1)
      .subscribe((data: any) => {
        this.trendingMovies = data.data;
      });

    this.movieService
      .fetchMovieByCategory(this.homePageGenreList[0], 1)
      .subscribe((data) => {
        this.categoryOneMovies = data.data;
      });

    this.movieService
      .fetchMovieByCategory(this.homePageGenreList[1], 1)
      .subscribe((data) => {
        this.categoryTwoMovies = data.data;
      });

    this.movieService
      .fetchMovieByCategory(this.homePageGenreList[2], 1)
      .subscribe((data) => {
        this.categoryThreeMovies = data.data;
      });

    this.movieService.fetchMovieGenres().subscribe((data) => {
      this.genreList = data;
    });
  }

  goToCategoryPage(categoryName: string) {
    this.router.navigate(['category', categoryName]);
  }
}
