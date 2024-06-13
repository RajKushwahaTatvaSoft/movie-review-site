import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../core/services/movie.service';
import { Movie } from '../../shared/models/movie.model';
import { ShimmerListComponent } from '../../shimmer-list/shimmer-list.component';
import { MovieTileComponent } from '../../shared/components/movie-tile/movie-tile.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-management',
  standalone: true,
  imports: [ShimmerListComponent,MovieTileComponent, CommonModule],
  templateUrl: './movie-management.component.html',
  styleUrl: './movie-management.component.css'
})
export class MovieManagementComponent implements OnInit {

  trendingMovies: Movie[] = [];
  mostRatingReceivedMovies: Movie[] = [];
  topRatedMovies: Movie[] = [];
  worstPerformingMovies: Movie[] = [];
  constructor(private movieService:MovieService){}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(){
    this.movieService
      .fetchMovieByCategory('trending', 1)
      .subscribe((data: any) => {
        this.trendingMovies = data.data;
      });
  }
}
