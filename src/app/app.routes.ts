import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './website/home/home.component';
import { LayoutComponent } from './website/layout/layout.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { CategoryScreenComponent } from './website/category-screen/category-screen.component';
import { RegisterComponent } from './register/register.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { SearchScreenComponent } from './search-screen/search-screen.component';
import { UserAuthGuard } from './core/guards/userauth.guard';
import { AddMovieComponent } from './admin/add-movie/add-movie.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminLayoutComponent } from './admin/admin-layout/admin-layout.component';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { MovieManagementComponent } from './admin/movie-management/movie-management.component';
import { AdminAuthGuard } from './core/guards/adminauth.guard';
import { UpdateMovieDetailComponent } from './admin/update-movie-detail/update-movie-detail.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AdminAuthGuard],
    children: [
      {
        path: 'dashboard',
        component: AdminDashboardComponent,
      },
      {
        path: 'movies',
        component: MovieManagementComponent,
      },
      {
        path: 'movies/movie/:id',
        component: UpdateMovieDetailComponent,
      },
      {
        path: 'users',
        component: UserManagementComponent,
      },
      {
        path: 'reviews',
        component: UserManagementComponent,
      },
      {
        path: 'add-movie',
        component: AddMovieComponent,
      },
    ],
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [UserAuthGuard],
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'home/movie/:id',
        component: MovieDetailComponent,
      },
      {
        path: 'category',
        pathMatch: 'full',
        redirectTo: 'category/trending',
      },
      {
        path: 'category/:categoryName',
        component: CategoryScreenComponent,
      },
      {
        path: 'category/:categoryName/movie/:id',
        component: MovieDetailComponent,
      },
      {
        path: 'category',
        component: CategoryScreenComponent,
      },
      {
        path: 'search/:movieName',
        component: SearchScreenComponent,
      },
      {
        path: 'search/:movieName/movie/:id',
        component: MovieDetailComponent,
      },
    ],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
