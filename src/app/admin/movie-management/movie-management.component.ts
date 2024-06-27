import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../core/services/movie.service';
import { Movie } from '../../shared/models/movie.model';
import { ShimmerListComponent } from '../../shimmer-list/shimmer-list.component';
import { MovieTileComponent } from '../../shared/components/movie-tile/movie-tile.component';
import { CommonModule } from '@angular/common';
import { PaginationButtonComponent } from '../../shared/components/pagination-button/pagination-button.component';
import { Genre } from '../../shared/models/genre.model';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from '../../shared/models/person.model';
import { Job } from '../../shared/models/job.model';
import { Department } from '../../shared/models/department.model';

@Component({
  selector: 'app-movie-management',
  standalone: true,
  imports: [
    ShimmerListComponent,
    MovieTileComponent,
    CommonModule,
    PaginationButtonComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './movie-management.component.html',
  styleUrl: './movie-management.component.css',
})
export class MovieManagementComponent implements OnInit {
  currentPageNumber: number = 1;
  currentPageSize: number = 12;
  isLoading: boolean = true;
  totalItems: number = 1;
  genreList: Genre[] = [];
  moviesList: Movie[] = [];
  filterForm;

  constructor(private movieService: MovieService, private fb: FormBuilder,private route: ActivatedRoute, private router: Router) {
    this.filterForm = fb.group({
      categoryId: 0,
      searchName : '',
    });
  }

  async ngOnInit(): Promise<void> {
    debugger;
    this.genreList = await this.movieService.getGenreList();

    this.fetchData();
  }

  fetchData() {
    this.isLoading = true;
    this.movieService
      .getMoviesByFilters(
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

  onMovieDeleted() {
    this.fetchData();
  }

  onPageChange(page: number): void {
    this.isLoading = true;
    this.currentPageNumber = page;
    this.fetchData();
  }

  goToDeletedMoviesPage(){
    this.router.navigate(['deleted'], { relativeTo: this.route });
  }
}

export class CastItem {
  selectedPerson: Person[] = [];
  characterName: string = '';
}

export class CrewItem {
  selectedPersons: Person[] = [];
  selectedJob: Job[] = [];
  selectedDepartment: Department[] = [];
}
