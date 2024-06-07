import { CommonModule } from '@angular/common';
import { Component, Injectable, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { MovieTileComponent } from '../movie-tile/movie-tile.component';
import { Movie } from '../shared/movie.model';
import { Router } from '@angular/router';

@Injectable()
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MovieTileComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  trendingMovies: Movie[] = [];
  actionMovies: Movie[] = [];
  comedyMovies: Movie[] = [];
  thrillerMovies: Movie[] = [];
  genreList: any[] = [];

  constructor(private movieService: MovieService,private router:Router) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.movieService.fetchMovieByCategory('trending',1).subscribe((data:any) => {
      this.trendingMovies = data.data;
    });

    this.movieService.fetchMovieByCategory('comedy',1).subscribe((data) => {
      this.comedyMovies = data.data;
    });

    this.movieService.fetchMovieByCategory('thriller',1).subscribe((data) => {
      this.thrillerMovies = data.data;
    });

    this.movieService.fetchMovieByCategory('action',1).subscribe((data) => {
      this.actionMovies = data.data;
    });

    this.movieService.fetchMovieGenres().subscribe((data) => {
      this.genreList = data;
    });
  }

  goToCategoryPage(categoryName: string) {
    this.router.navigate(['category',categoryName]);
  }
}
