import { Component, Input, OnDestroy } from '@angular/core';
import { ShimmerService } from '../core/services/shimmer.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shimmer-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shimmer-card.component.html',
  styleUrl: './shimmer-card.component.css',
})
export class ShimmerCardComponent implements OnDestroy {
  @Input() shimmerFor: string = '';

  constructor(private shimmerService: ShimmerService) {}

  ngOnDestroy(): void {
    this.shimmerService.removeShimmerAnimation(this.shimmerFor);
  }
  
}
