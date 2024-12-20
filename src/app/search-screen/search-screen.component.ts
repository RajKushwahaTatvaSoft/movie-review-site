import { Component, Inject, OnInit } from '@angular/core';
import { PaginationButtonComponent } from '../shared/components/pagination-button/pagination-button.component';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../core/services/movie.service';
import { MovieTileComponent } from '../shared/components/movie-tile/movie-tile.component';
import { CommonModule } from '@angular/common';
import { ShimmerListComponent } from '../shimmer-list/shimmer-list.component';

@Component({
  selector: 'app-search-screen',
  standalone: true,
  imports: [
    PaginationButtonComponent,
    MovieTileComponent,
    CommonModule,
    ShimmerListComponent,
  ],
  templateUrl: './search-screen.component.html',
  styleUrl: './search-screen.component.css',
})
export class SearchScreenComponent implements OnInit {
  movieName: string = '';
  isLoading = true;
  currentPageNumber: number = 1;
  currentPageSize: number = 12;
  totalItems: number = 12;
  moviesList: any = [];

  constructor(
    @Inject(ActivatedRoute) private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {

    this.route.params.subscribe((val) => {
      this.movieName = val['movieName'].replaceAll('-', ' ');
      console.log(this.movieName);
      this.fetchMovieList();
    });

  }

  fetchMovieList() {
    this.isLoading = true;
    this.movieService
      .fetchMovieByName(
        this.movieName,
        this.currentPageNumber,
        this.currentPageSize
      )
      .subscribe((response: any) => {
        this.isLoading = false;
        this.moviesList = response.result.data;
        this.totalItems = response.result.totalCount;
        this.currentPageNumber = response.result.currentPage;
      });
  }

  onPageChange(page: number): void {
    this.isLoading = true;
    debugger;
    this.currentPageNumber = page;
    this.fetchMovieList();
  }
}
