import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { Rating } from '../shared/models/rating.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-review-card',
  standalone: true,
  imports: [NgbRatingModule,CommonModule],
  templateUrl: './review-card.component.html',
  styleUrl: './review-card.component.css',
})
export class ReviewCardComponent  {
  @Input() userRating : Rating = new Rating('','',0,'',false);
  isImageLoaded = false;
}