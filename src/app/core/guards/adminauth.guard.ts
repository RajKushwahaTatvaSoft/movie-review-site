import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    console.log(state.url);

    if (this.authService.isAdmin()) {
      return true;
    } else if (this.authService.hasToken()) {
      this.router.navigate(['login']);
      return false;
    } else {
      localStorage.setItem('redirectAfterLogin', state.url);
      this.router.navigate(['login']);
      return false;
    }
  }
}
