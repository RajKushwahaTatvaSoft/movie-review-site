import { Component, Input } from '@angular/core';
import { ShimmerService } from '../core/services/shimmer.service';
import { CommonModule } from '@angular/common';
import { ShimmerCardComponent } from '../shimmer-card/shimmer-card.component';

@Component({
  selector: 'app-shimmer-list',
  standalone: true,
  imports: [CommonModule, ShimmerCardComponent],
  templateUrl: './shimmer-list.component.html',
  styleUrl: './shimmer-list.component.css',
})
export class ShimmerListComponent {
  @Input() itemCount: number = 3; // Default to 3 shimmer cards
  @Input() listForContext: 'movietile' | 'reviewtile' = 'movietile';
  shimmerItems: string[] = [];

  constructor(private shimmerService: ShimmerService) {}

  ngOnInit(): void {
    for (let i = 0; i < this.itemCount; i++) {
      const animationId = this.shimmerService.generateShimmerAnimationId();
      this.shimmerItems.push(animationId);
    }
  }

  ngOnDestroy(): void {
    this.shimmerItems.forEach((animationId) =>
      this.shimmerService.removeShimmerAnimation(animationId)
    );
  }
}
