import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ShimmerService {
  private shimmerAnimations: Set<string> = new Set();

  constructor() {}

  generateShimmerAnimationId(): string {
    const animationId = `shimmer-${Math.random().toString(36).substr(2, 9)}`;
    this.shimmerAnimations.add(animationId);
    return animationId;
  }

  removeShimmerAnimation(animationId: string): void {
    this.shimmerAnimations.delete(animationId);
  }

  isShimmerAnimationRunning(animationId: string): boolean {
    return this.shimmerAnimations.has(animationId);
  }
}
