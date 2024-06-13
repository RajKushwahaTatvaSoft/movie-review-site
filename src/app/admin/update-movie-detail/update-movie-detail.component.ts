import { Component, Inject, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../core/services/movie.service';
import { Movie } from '../../shared/models/movie.model';
import { CommonModule } from '@angular/common';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { ReviewCardComponent } from '../../review-card/review-card.component';
import { PaginationButtonComponent } from '../../shared/components/pagination-button/pagination-button.component';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-update-movie-detail',
  standalone: true,
  imports: [
    NgbRatingModule,
    ReviewCardComponent,
    CommonModule,
    PaginationButtonComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './update-movie-detail.component.html',
  styleUrl: './update-movie-detail.component.css',
})
export class UpdateMovieDetailComponent {
  userForm;
  id = 0;
  movieDetail: Movie = new Movie(0, '', 0, 0, 0, 0, '', 0);
  reviewsList: any[] = [];
  reviewDesc = '';
  reviewRating = 0;
  @Input() isEditing = false;
  currentPageNumber: number = 1;
  reviewPageSize: number = 1;
  totalItems: number = 1;

  constructor(
    private formBuilder: FormBuilder,
    @Inject(ActivatedRoute) private route: ActivatedRoute,
    @Inject(Router) private router: Router,
    private movieService: MovieService
  ) {

    
    this.userForm = this.formBuilder.group({
      title: ['', Validators.required],
      releasedate: ['', Validators.required],
      duration: ['', [Validators.required, Validators.min(1)]],
      posterurl: ['', Validators.required],
      imdbid: ['', Validators.required],
      revenue: ['', Validators.min(1)],
      budget: ['', Validators.min(1)],
      overview: [''],
      plot: [''],
      writer: [''],
      actor: [''],
      director: [''],
    });

    
    if(this.isEditing){
      this.userForm.enable();
    }
    else{
      this.userForm.disable();
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe((data) => {
      this.id = this.route.snapshot.params['id'];
      this.fetchData();
    });
  }

  get editButtonText () : string{
    return this.isEditing? 'Cancel' : 'Edit';
  }

  toggleEdit(){
    this.isEditing = !this.isEditing;

    if(this.isEditing){
      this.userForm.enable();
    }
    else{
      this.userForm.disable();
    }

  }

  getNumberFormat(num: number) {
    return Intl.NumberFormat('en-US', { notation: 'compact' }).format(num);
  }

  goToCategoryPage(category: string) {
    this.router.navigate(['category', category]);
  }

  getFullName(user: any): string {
    return `${user.firstName} ${user.lastName}`;
  }

  get ratingOutOf5(): number {
    return this.movieDetail.rating / 2;
  }

  getHourlyTime(duration: number) {
    var hours = Math.floor(duration / 60);
    var minutes = duration % 60;

    return `${hours}h ${minutes}m`;
  }

  fetchMovieReviews() {
    this.movieService
      .fetchMovieReviews(this.movieDetail.movieId, this.currentPageNumber)
      .subscribe((data: any) => {
        if (data.isSuccess == true) {
          debugger;
          this.reviewsList = data.result.data;
          this.currentPageNumber = data.result.currentPage;
          this.reviewPageSize = data.result.pageSize;
          this.totalItems = data.result.totalCount;
        }
      });
  }

  fetchData() {
    this.movieService.fetchMovieDetailById(this.id).subscribe((data: any) => {
      this.movieDetail = data;

      this.userForm.patchValue({
        title: this.movieDetail.title,
        releasedate: this.getValidDate(this.movieDetail.releaseDateStr || ''),
        duration: this.movieDetail.duration?.toString() || '',
        posterurl: this.movieDetail.posterUrl || '',
        imdbid: this.movieDetail.imdbId || '',
        revenue: this.movieDetail.budget.toString(),
        budget: '',
        overview: this.movieDetail.overview || '',
        plot: this.movieDetail.overview || '',
        writer: '',
        actor: '',
        director: '',
      });
      this.fetchMovieReviews();
    });
  }

  private monthNumbers = new Map([
    ['jan', 0],
    ['feb', 1],
    ['mar', 2],
    ['apr', 3],
    ['may', 4],
    ['jun', 5],
    ['jul', 6],
    ['aug', 7],
    ['sep', 8],
    ['oct', 9],
    ['nov', 10],
    ['dec', 11],
  ]);

  private getMonthNumber(month: string): number {
    return this.monthNumbers.get(month.toLowerCase()) || -1;
  }

  getValidDate(value: string) {
    // Split the date string into components (day, month, year)
    const dateParts = value.split(' ');
    if (dateParts.length !== 3) {
      console.warn(`Invalid date format: ${value}`);
      return value; // Return original value for invalid formats
    }

    const day = parseInt(dateParts[0], 10);
    const month = this.getMonthNumber(dateParts[1].toLowerCase());
    const year = parseInt(dateParts[2], 10);

    // Create a Date object with the extracted components
    const date = new Date(year, month, day);

    // Use toISOString() to get the date in YYYY-MM-DD format
    return date.toISOString().slice(0, 10);
  }

  extractBudgetNumbers(budgetString: string): string {
    // Use a regular expression to match digits, ".", "+" or "-".
    const regex = /[\d\-+\.]/g; // Add 'g' flag for global matching
    const match = budgetString.match(regex);

    // If a match is found, join the matched characters into a string.
    return match ? match.join('') : '';
  }

  submitReview() {
    console.log(this.reviewDesc);
    console.log(this.reviewRating);
    console.log(this.movieDetail.movieId);

    this.movieService
      .addMovieReview(
        this.movieDetail.movieId,
        this.reviewRating,
        this.reviewDesc
      )
      .then(() => {
        this.fetchData();
      });
  }

  onPageChange(page: number): void {
    debugger;
    this.currentPageNumber = page;
    this.fetchData();
  }
}
