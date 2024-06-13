import { Component, Inject, Injectable, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../core/services/movie.service';
import { MovieTileComponent } from '../../shared/components/movie-tile/movie-tile.component';
import { CommonModule } from '@angular/common';
import { PaginationButtonComponent } from '../../shared/components/pagination-button/pagination-button.component';
import { Genre } from '../../shared/models/genre.model';
import { Movie } from '../../shared/models/movie.model';
import { ShimmerListComponent } from '../../shimmer-list/shimmer-list.component';


@Component({
  selector: 'app-category-screen',
  standalone: true,
  imports: [CommonModule, PaginationButtonComponent,MovieTileComponent,ShimmerListComponent],
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
  isLoading = true;

  constructor(
    @Inject(ActivatedRoute) private route: ActivatedRoute,
    private movieService: MovieService,
    @Inject(Router) private router: Router,
  ) {}

  
  printListToConsole() {
    MovieTileComponent.problemImagesMovieId.forEach((value, index) => {
      console.log(value);
    });

    this.movieService.updateMovieDataFromOmdb();
  }

  ngOnInit(): void {
 
    this.fetchGenreList();

    this.route.params.subscribe((val) => {
      this.categoryName = val['categoryName'].toLowerCase().replaceAll('-',' ');
      
    if(!this.categoryName){
      this.categoryName = 'Trending'
    }

      console.log(this.categoryName);
      this.fetchMovieList();
    });

  }

  fetchMovieList() {
    this.isLoading = true;
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
        this.isLoading = false;
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
    this.router.navigate(['category', categoryName.toLowerCase().replaceAll(' ','-')]);
  }

  onPageChange(page: number): void {
    debugger;
    this.isLoading = true;
    this.currentPageNumber = page;
    this.fetchMovieList();
  }
}
