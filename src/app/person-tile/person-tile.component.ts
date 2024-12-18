import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { Cast } from '../shared/models/cast.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-person-tile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './person-tile.component.html',
  styleUrl: './person-tile.component.css',
})
export class PersonTileComponent{
  @Input() personDetail: Cast = new Cast(0, 0, '', 0);
  imageOpacity = 0;
  isImageLoaded = false;

  constructor(private router: Router) {}

  loadStart() {
    console.log('load start');
    this.imageOpacity = 0;
  }

  onload(){
    console.log('angular on load');
  }

  onImageError() {
  
    this.personDetail.profilePath = '/assets/not_found_movie.svg';
  }

  goToPersonPage(personId: number) {
    this.router.navigate(['cast', personId]);
  }
}
