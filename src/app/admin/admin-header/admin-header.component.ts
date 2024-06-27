import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { MovieService } from '../../core/services/movie.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-header',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.css',
})
export class AdminHeaderComponent {
  userName: string;
  userProfileUrl: string;
  movieSearchList: { movieId: number; title: string }[] = [];
  isUserProfileLoaded = false;

  constructor(
    private authService: AuthService,
    private movieService: MovieService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.userName = localStorage.getItem('userFullName') || '';
    this.userProfileUrl = localStorage.getItem('userProfileUrl') || '';
  }

  goToAddMovie() {
    this.router.navigate(['admin', 'add-movie']);
  }

  logoutUser() {
    this.authService.logoutUser();
    this.router.navigate(['login']);
  }

  goToProfile() {
    this.router.navigate(['admin','dashboard', 'profile']);
  }
}
