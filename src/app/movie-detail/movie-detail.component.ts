import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { Movie } from '../shared/movie.model';
import { CommonModule } from '@angular/common';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, MinValidator } from '@angular/forms';
import { ReviewCardComponent } from '../review-card/review-card.component';
import { PaginationButtonComponent } from '../pagination-button/pagination-button.component';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [NgbRatingModule, FormsModule, ReviewCardComponent, CommonModule,PaginationButtonComponent],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.css',
})
export class MovieDetailComponent implements OnInit {
  id = 0;
  movieDetail: Movie = new Movie(0,'',0,0,0,0,'',0);
  reviewsList: any[] = [];
  reviewDesc = '';
  reviewRating = 0;
  userId = 0;
  
  currentPageNumber: number = 1;
  reviewPageSize: number = 1;
  totalItems :number = 1;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.fetchData();

    this.userId = parseInt(localStorage.getItem('userId') || '');
  }

  getFullName(user: any): string {
    return `${user.firstName} ${user.lastName}`;
  }

  get ratingOutOf5(): number {
    return this.movieDetail.rating / 2;
  }

  getHourlyTime(duration:number){

    var hours = Math.floor(duration / 60);          
    var minutes = duration % 60;

    return `${hours}h ${minutes}m`;
  }

  fetchMovieReviews() {
    this.movieService
      .fetchMovieReviews(this.movieDetail.movieId,this.currentPageNumber)
      .subscribe((data: any) => {
        if (data.isSuccess == true) {
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
    console.log(this.userId);
    console.log(this.movieDetail.movieId);

    this.movieService
      .addMovieReview(
        this.movieDetail.movieId,
        this.userId,
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
