import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { CategoryScreenComponent } from './category-screen/category-screen.component';
import { RegisterComponent } from './register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SearchScreenComponent } from './search-screen/search-screen.component';

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
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'movie/:id',
        component: MovieDetailComponent,
      },
      {
        path: 'category/:categoryName',
        component: CategoryScreenComponent,
      },
      {
        path: 'category',
        component: CategoryScreenComponent,
      },
      {
        path: 'search/:movieName',
        component: SearchScreenComponent,
      },
    ],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
