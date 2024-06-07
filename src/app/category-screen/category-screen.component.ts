import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { MovieTileComponent } from '../movie-tile/movie-tile.component';
import { CommonModule } from '@angular/common';
import { PaginationButtonComponent } from '../pagination-button/pagination-button.component';
import { Genre } from '../shared/genre.model';
import { Movie } from '../shared/movie.model';

@Component({
  selector: 'app-category-screen',
  standalone: true,
  imports: [MovieTileComponent, CommonModule, PaginationButtonComponent],
  templateUrl: './category-screen.component.html',
  styleUrl: './category-screen.component.css',
})
export class CategoryScreenComponent implements OnInit {
  categoryName: string = '';
  currentPageNumber: number = 1;
  categoryPageSize: number = 12;
  totalItems: number = 100;
  genreList: Genre[] = [];
  moviesList: Movie[] = [];

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    debugger;
    this.categoryName = this.route.snapshot.params['categoryName'];

    if(!this.categoryName){
      this.categoryName = 'Trending'
    }

    this.fetchGenreList();

    this.route.params.subscribe((val) => {
      this.categoryName = val['categoryName'].toLowerCase();
      console.log(this.categoryName);
      this.fetchMovieList();
    });

    this.fetchMovieList();
  }

  fetchMovieList() {
    this.movieService
      .fetchMovieByCategory(
        this.categoryName,
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

  fetchGenreList() {
    this.movieService.fetchMovieGenres().subscribe((data) => {
      this.genreList = data;
      this.genreList.push(new Genre(0, 'Trending'));
      this.genreList.sort((n1,n2) => n1.genreId - n2.genreId);
    });
  }

  goToCategoryPage(categoryName: string) {
    this.router.navigate(['category', categoryName.toLowerCase()]);
  }

  onPageChange(page: number): void {
    debugger;
    this.currentPageNumber = page;
    this.fetchMovieList();
  }
}
