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
import { AddMovieComponent } from './admin/movie-management/add-movie/add-movie.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminLayoutComponent } from './admin/admin-layout/admin-layout.component';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { MovieManagementComponent } from './admin/movie-management/movie-management.component';
import { AdminAuthGuard } from './core/guards/adminauth.guard';
import { UpdateMovieDetailComponent } from './admin/movie-management/update-movie-detail/update-movie-detail.component';
import { CastScreenComponent } from './cast-screen/cast-screen.component';
import { AddMovieCastComponent } from './admin/movie-management/add-movie/add-movie-cast/add-movie-cast.component';
import { AddMovieCrewComponent } from './admin/movie-management/add-movie/add-movie-crew/add-movie-crew.component';
import { CrewManagementComponent } from './admin/crew-management/crew-management.component';
import { UserEditComponent } from './admin/user-management/user-edit/user-edit.component';
import { DeletedUserComponent } from './admin/user-management/deleted-user/deleted-user.component';
import { DeletedMovieComponent } from './admin/movie-management/deleted-movie/deleted-movie.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { PersonDetailComponent } from './person-detail/person-detail.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent, 
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
        path: 'dashboard/profile',
        component: UserProfileComponent,
      },
      {
        path: 'movies',
        component: MovieManagementComponent,
      },      
      {
        path: 'movies/deleted',
        component: DeletedMovieComponent,
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
        path: 'users/deleted',
        component: DeletedUserComponent,
      },
      {
        path: 'users/:userId/edit',
        component: UserEditComponent,
      },
      {
        path: 'crews',
        component: CrewManagementComponent,
      },
      {
        path: 'add-movie',
        component: AddMovieComponent,
      },
      {
        path: 'add-cast/:movieId',
        component: AddMovieCastComponent,
      },
      {
        path: 'add-crew/:movieId',
        component: AddMovieCrewComponent,
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
        path: 'home/profile',
        component: UserProfileComponent,
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
      {
        path: 'cast',
        component: CastScreenComponent,
      },
      {
        path: 'cast/:personId',
        component: PersonDetailComponent,
      },
      {
        path: 'cast/:personId/movie/:id',
        component: MovieDetailComponent,
      },
      
    ],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
