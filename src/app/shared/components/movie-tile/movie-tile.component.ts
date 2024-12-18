import {
  Component,
  Inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  EventEmitter,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from '../../models/movie.model';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { MovieService } from '../../../core/services/movie.service';

interface BaseMovieTileData {
  posterUrl? : string;
  movieId : number;
  title: string;
}

interface MovieDetailTileData extends BaseMovieTileData {
  duration?: number;
  rating: number;
  ratingCount: number;
}

interface SearchMovieTileData extends BaseMovieTileData {
  releaseDate: Date;
}

interface CastMovieTileData extends BaseMovieTileData {
  character: string;
  castOrder: number;
}

type MovieTileData =
  | MovieDetailTileData
  | CastMovieTileData;

@Component({
  selector: 'app-movie-tile',
  standalone: true,
  imports: [NgbRatingModule, CommonModule],
  templateUrl: './movie-tile.component.html',
  styleUrl: './movie-tile.component.css',
})
export class MovieTileComponent {
  static problemImagesMovieId: string[] = [];
  // @Input() movieDetail: Movie = new Movie(0, '', 0, 0, 0, 0, '', 0);
  @Input() movieDetail: MovieTileData = { title : '', movieId : 0, posterUrl : '', character: '', castOrder : 0}; // Default value
  @Input() isAdmin = false;
  isImageLoaded = false;
  @Input() isDeletedMovie = false;
  @Output() movieDeleted = new EventEmitter<void>();

  constructor(
    private movieService: MovieService,
    @Inject(Router) private router: Router,
    @Inject(ActivatedRoute) private route: ActivatedRoute
  ) {}

  isMovieDetailData(data: MovieTileData): data is MovieDetailTileData {
    return (data as MovieDetailTileData).rating !== undefined;
  }

  isCastMovieTileData(data: MovieTileData): data is CastMovieTileData {
    return (data as CastMovieTileData).character !== undefined;
  }

  onImageError(movieId: string) {
    (this.movieDetail as MovieDetailTileData).posterUrl =
      '/assets/not_found_movie.svg';
    console.log(movieId);
    MovieTileComponent.problemImagesMovieId.push(movieId);
  }

  goToMovieDetail(id: number) {
    // this.router.navigate([id],);
    this.router.navigate(['movie', id], { relativeTo: this.route });
  }

  ariaValueText(current: number, max: number) {
    return `${current} out of ${max} hearts`;
  }

  goToMovieEdit(movieId: number) {}

  deleteMovie(movieId: number) {}

  openDeleteModal(movieId: number, event: Event) {
    event.stopPropagation();

    Swal.fire({
      title: 'Confirmation',
      text: 'Are you sure want to remove this movie?',
      icon: 'warning',
      confirmButtonText: 'Yes',
      imageHeight: '10',
      showCancelButton: true,
      focusCancel: true,
      cancelButtonColor: 'blueviolet',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {
        this.movieService.deleteMovieById(movieId).subscribe((data: any) => {
          if (data.isSuccess) {
            this.movieDeleted.emit();
            Swal.fire('Removed!', 'Movie removed successfully.', 'success');
          } else {
            Swal.fire('Cancelled', "Could'nt Delete Movie.)", 'error');
          }
        });
      }
    });
  }

  openRestoreModal(movieId: number, event: Event) {
    event.stopPropagation();

    Swal.fire({
      title: 'Confirmation',
      text: 'Are you sure want to restore this movie?',
      icon: 'warning',
      confirmButtonText: 'Yes',
      imageHeight: '10',
      showCancelButton: true,
      focusCancel: true,
      cancelButtonColor: 'blueviolet',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {
        this.movieService.restoreMovieById(movieId).subscribe((data: any) => {
          if (data.isSuccess) {
            this.movieDeleted.emit();
            Swal.fire('Removed!', 'Movie restored successfully.', 'success');
          } else {
            Swal.fire('Cancelled', "Couldn't restore movie.)", 'error');
          }
        });
      }
    });
  }
}
