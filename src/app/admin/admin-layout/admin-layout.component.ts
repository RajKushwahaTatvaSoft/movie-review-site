import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { ShimmerListComponent } from '../../shimmer-list/shimmer-list.component';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ShimmerListComponent,HeaderComponent],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css',
})
export class AdminLayoutComponent {
  selectedRoute: string = 'dashboard';
  featureList: { route: string; name: string }[] = [
    {
      route: 'dashboard',
      name: 'Dashboard',
    },{
      route: 'movies',
      name: 'Movie',
    },
    {
      route: 'users',
      name: 'User',
    },
    {
      route: 'reviews',
      name: 'Review',
    },
  ];

  constructor(private router: Router,private route: ActivatedRoute) {}

  goToFeaturePage(feature: string) {
    this.selectedRoute = feature;
    this.router.navigate([feature],{relativeTo: this.route});
  }
}
