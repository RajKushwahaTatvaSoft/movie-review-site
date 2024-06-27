import { Component, OnInit } from '@angular/core';
import { ShimmerListComponent } from '../../../shimmer-list/shimmer-list.component';
import { CommonModule } from '@angular/common';
import { Genre } from '../../../shared/models/genre.model';
import { Movie } from '../../../shared/models/movie.model';
import { MovieService } from '../../../core/services/movie.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MovieTileComponent } from '../../../shared/components/movie-tile/movie-tile.component';
import { PaginationButtonComponent } from '../../../shared/components/pagination-button/pagination-button.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deleted-movie',
  standalone: true,
  imports: [
    ShimmerListComponent,
    CommonModule,
    MovieTileComponent,
    PaginationButtonComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './deleted-movie.component.html',
  styleUrl: './deleted-movie.component.css',
})
export class DeletedMovieComponent implements OnInit {
  currentPageNumber: number = 1;
  currentPageSize: number = 12;
  isLoading: boolean = true;
  totalItems: number = 1;
  genreList: Genre[] = [];
  moviesList: Movie[] = [];
  filterForm;

  constructor(private movieService: MovieService, private fb: FormBuilder,private router:Router) {
    this.filterForm = fb.group({
      categoryId: 0,
      searchName: '',
    });
  }

  async ngOnInit(): Promise<void> {
    debugger;
    this.genreList = await this.movieService.getGenreList();

    this.fetchDeletedMovieData();
  }

  goBackToMovies(){
    this.router.navigate(['admin','movies']);
  }
  
  onMovieRestored() {
    this.fetchDeletedMovieData();
  }

  
  fetchDeletedMovieData() {
    this.isLoading = true;
    this.movieService
      .getDeletedMoviesByFilters(
        this.filterForm.value.categoryId || 0,
        this.filterForm.value.searchName || '',
        this.currentPageNumber,
        this.currentPageSize
      )
      .subscribe((data: any) => {
        debugger;
        this.moviesList = data.result.data;
        this.totalItems = data.result.totalCount;
        this.isLoading = false;
      });
  }

  onPageChange(page: number): void {
    this.isLoading = true;
    this.currentPageNumber = page;
    this.fetchDeletedMovieData();
  }
}
