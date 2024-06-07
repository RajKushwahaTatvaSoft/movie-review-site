import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule,FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  userName: string;
  movieSearchName: string = '';

  constructor(private authService: AuthService,private router:Router) {
    this.userName = localStorage.getItem('userFullName') || '';
  }

  logoutUser() {
    this.authService.logoutUser();
    this.router.navigate(['login']);
  }

  searchMovieByName(){

    let str =  this.movieSearchName.replaceAll(' ','-');
    
    this.router.navigate(['search',str]);
  }

  updateSearch(value:string){
    this.movieSearchName = value;
  }
}
