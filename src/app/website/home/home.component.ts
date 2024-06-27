import { CommonModule } from '@angular/common';
import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { MovieService } from '../../core/services/movie.service';
import { MovieTileComponent } from '../../shared/components/movie-tile/movie-tile.component';
import { Movie } from '../../shared/models/movie.model';
import { Router } from '@angular/router';
import { ShimmerListComponent } from '../../shimmer-list/shimmer-list.component';
import { Genre } from '../../shared/models/genre.model';

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
  genreList: Genre[] = [];
  homePageGenreList: string[] = ['Comedy', 'Action', 'Thriller'];

  constructor(
    private movieService: MovieService,
    @Inject(Router) private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  async fetchData() {
    this.movieService
      .fetchMovieByCategory('trending', 1)
      .subscribe((data: any) => {
        debugger;
        this.trendingMovies = data.result.data;
      });

    this.movieService
      .fetchMovieByCategory(this.homePageGenreList[0], 1)
      .subscribe((data) => {
        this.categoryOneMovies = data.result.data;
      });

    this.movieService
      .fetchMovieByCategory(this.homePageGenreList[1], 1)
      .subscribe((data) => {
        this.categoryTwoMovies = data.result.data;
      });

    this.movieService
      .fetchMovieByCategory(this.homePageGenreList[2], 1)
      .subscribe((data) => {
        this.categoryThreeMovies = data.result.data;
      });

    this.genreList = await this.movieService.getGenreList();
  }

  goToCategoryPage(categoryName: string) {
    this.router.navigate(['category', categoryName]);
  }
}
