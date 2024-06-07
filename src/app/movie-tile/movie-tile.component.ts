import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from '../shared/movie.model';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { assert } from 'console';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-tile',
  standalone: true,
  imports: [NgbRatingModule,CommonModule],
  templateUrl: './movie-tile.component.html',
  styleUrl: './movie-tile.component.css',
})
export class MovieTileComponent implements OnChanges {
  ratingOutOfStar: number = 0;

  @Input() movieDetail: Movie = new Movie(0, '', 0, 0, 0, 0, '', 0);
  constructor(private router: Router) {
    this.ratingOutOfStar = this.movieDetail.rating / 2;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.ratingOutOfStar = this.movieDetail.rating / 2;
    this.movieDetail.genreList = this.movieDetail.genres.split('|');
  }


  goToMovieDetail(id: number) {
    this.router.navigate(['movie', id]);
  }

  ariaValueText(current: number, max: number) {
    return `${current} out of ${max} hearts`;
  }
}
