import {
  Component,
  Inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  input,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from '../../models/movie.model';
import {
  ModalDismissReasons,
  NgbModal,
  NgbRatingModule,
} from '@ng-bootstrap/ng-bootstrap';
import { assert } from 'console';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-movie-tile',
  standalone: true,
  imports: [NgbRatingModule, CommonModule],
  templateUrl: './movie-tile.component.html',
  styleUrl: './movie-tile.component.css',
})
export class MovieTileComponent implements OnChanges {
  ratingOutOfStar: number = 0;
  static problemImagesMovieId: string[] = [];
  @Input() movieDetail: Movie = new Movie(0, '', 0, 0, 0, 0, '', 0);
  @Input() isAdmin = false;
  constructor(
    @Inject(Router) private router: Router,
    @Inject(ActivatedRoute) private route: ActivatedRoute,
    private modalService: NgbModal
  ) {
    this.ratingOutOfStar = this.movieDetail.rating / 2;
  }

  onImageError(movieId: string) {
    this.movieDetail.posterUrl =
      'http://localhost:4200/assets/not_found_movie.svg';
    console.log(movieId);
    MovieTileComponent.problemImagesMovieId.push(movieId);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.ratingOutOfStar = this.movieDetail.rating / 2;
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

  openDeleteModal(content: string, movieId: number, event: Event) {
    event.stopPropagation();

    Swal.fire({
      title: 'Error!',
      text: 'Are you sure want to remove this movie?',
      icon: 'warning',
      confirmButtonText: 'Yes',
      imageHeight : 100,
      showCancelButton: true,
      focusCancel: true,
      cancelButtonColor: 'blueviolet',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {
        console.log(true);
      }
    });
  }
}
