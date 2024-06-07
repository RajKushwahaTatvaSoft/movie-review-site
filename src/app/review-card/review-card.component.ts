import { Component, Input, input } from '@angular/core';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-review-card',
  standalone: true,
  imports: [NgbRatingModule],
  templateUrl: './review-card.component.html',
  styleUrl: './review-card.component.css',
})
export class ReviewCardComponent {
  @Input() userName = '';
  @Input() rating = 0;
  @Input() desc?: string;
}
