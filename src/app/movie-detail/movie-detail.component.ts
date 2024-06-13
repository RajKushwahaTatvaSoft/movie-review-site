import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../core/services/movie.service';
import { Movie } from '../shared/models/movie.model';
import { CommonModule } from '@angular/common';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { ReviewCardComponent } from '../review-card/review-card.component';
import { PaginationButtonComponent } from '../shared/components/pagination-button/pagination-button.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [
    NgbRatingModule,
    ReviewCardComponent,
    CommonModule,
    PaginationButtonComponent,
    FormsModule,
  ],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.css',
})
export class MovieDetailComponent implements OnInit {
  id = 0;
  movieDetail: Movie = new Movie(0, '', 0, 0, 0, 0, '', 0);
  reviewsList: any[] = [];
  reviewDesc = '';
  reviewRating = 0;

  currentPageNumber: number = 1;
  reviewPageSize: number = 1;
  totalItems: number = 1;

  constructor(
    @Inject(ActivatedRoute) private route: ActivatedRoute,
    @Inject(Router) private router : Router,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {

    this.route.params.subscribe((data)=> {
      this.id = this.route.snapshot.params['id'];
      this.fetchData();
    });

  }

  getNumberFormat(num: number) {
    return Intl.NumberFormat("en-US",{notation: "compact"}).format(num);
  }

  goToCategoryPage(category:string){
    this.router.navigate(['category',category]);
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
      this.fetchMovieReviews();
    });
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
