import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../core/services/movie.service';
import { Movie } from '../shared/models/movie.model';
import { CommonModule } from '@angular/common';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { ReviewCardComponent } from '../review-card/review-card.component';
import { PaginationButtonComponent } from '../shared/components/pagination-button/pagination-button.component';
import { FormsModule } from '@angular/forms';
import { Rating } from '../shared/models/rating.model';
import { error } from 'console';
import { ShimmerListComponent } from '../shimmer-list/shimmer-list.component';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [
    NgbRatingModule,
    ReviewCardComponent,
    CommonModule,
    PaginationButtonComponent,
    FormsModule,
    ShimmerListComponent
  ],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.css',
})
export class MovieDetailComponent implements OnInit {
  id = 0;
  isMovieLoading: boolean = true;
  isReviewLoading: boolean = true;
  movieDetail: Movie = new Movie(0, '', 0, 0, 0, 0, '', 0);
  reviewsList: any[] = [];
  reviewDesc = '';
  reviewRating = 0;
  userSelfRating: Rating = new Rating('', '', 0, '', false);

  currentPageNumber: number = 1;
  reviewPageSize: number = 1;
  totalItems: number = 1;

  constructor(
    @Inject(ActivatedRoute) private route: ActivatedRoute,
    @Inject(Router) private router: Router,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    debugger;
    this.route.params.subscribe((data) => {
      this.id = this.route.snapshot.params['id'];
      this.fetchData();
    });
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
    this.isReviewLoading = true;
    this.movieService
      .fetchMovieReviews(this.id, this.currentPageNumber)
      .subscribe((data: any) => {
        if (data.isSuccess == true) {
          this.reviewsList = data.result.data;
          this.currentPageNumber = data.result.currentPage;
          this.reviewPageSize = data.result.pageSize;
          this.totalItems = data.result.totalCount;
          this.isReviewLoading = false;
        }
      });
  }

  fetchSelfReview() {
    this.movieService
      .fetchSelfReviewForMovie(this.id)
      .subscribe((data: any) => {
        if (data.isSuccess == true) {
          this.userSelfRating = data.result;
          this.reviewRating = this.userSelfRating.rating;
          this.reviewDesc = this.userSelfRating.description;
        }
      }, error => {

      });
  }

  fetchData() {
    this.isMovieLoading = true;
    this.isReviewLoading = true;
    this.movieService
      .fetchMovieDetailById(this.id)
      .subscribe((response: any) => {
        this.movieDetail = response.result;
        this.isMovieLoading = false;
      });
    this.fetchSelfReview();
    this.fetchMovieReviews();
  }

  submitReview() {
    console.log(this.reviewDesc);
    console.log(this.reviewRating);
    console.log(this.movieDetail.movieId);

    if (this.userSelfRating.ratingId == 0) {
      this.movieService
        .addMovieReview(
          this.movieDetail.movieId,
          this.reviewRating,
          this.reviewDesc
        )
        .then(() => {
          this.fetchData();
        });
    } else {
      this.movieService
        .updateMovieReview(
          this.movieDetail.movieId,
          this.reviewRating,
          this.reviewDesc,
          this.userSelfRating.ratingId
        )
        .then(() => {
          this.fetchData();
        });
    }
  }

  onPageChange(page: number): void {
    debugger;
    this.currentPageNumber = page;
    this.fetchMovieReviews();
  }
}
