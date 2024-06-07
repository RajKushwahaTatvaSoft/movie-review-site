import { Component, OnInit } from '@angular/core';
import { PaginationButtonComponent } from '../pagination-button/pagination-button.component';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { MovieTileComponent } from '../movie-tile/movie-tile.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-screen',
  standalone: true,
  imports: [PaginationButtonComponent, MovieTileComponent, CommonModule],
  templateUrl: './search-screen.component.html',
  styleUrl: './search-screen.component.css',
})
export class SearchScreenComponent implements OnInit {
  movieName: string = '';
  currentPageNumber: number = 1;
  categoryPageSize: number = 12;
  totalItems: number = 12;
  moviesList: any = [];

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.movieName = (this.route.snapshot.params['movieName']);

    this.route.params.subscribe((val) => {
      this.movieName = val['movieName'].replaceAll('-',' ');
      console.log(this.movieName);
      this.fetchMovieList();
    });

    this.fetchMovieList();
  }

  fetchMovieList() {

    this.movieService
      .fetchMovieByName(
        this.movieName,
        this.currentPageNumber,
        this.categoryPageSize
      )
      .subscribe((response: any) => {
        debugger;
        this.moviesList = response.data;
        this.totalItems = response.totalCount;
        this.currentPageNumber = response.currentPage;
      });
  }

  onPageChange(page: number): void {
    debugger;
    this.currentPageNumber = page;
    this.fetchMovieList();
  }
}
