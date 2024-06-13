import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  userform;

  constructor(
    private router: Router,
    public fb: FormBuilder,
    private authService: AuthService
  ) {
    this.userform = fb.group({
      userName: '',
      password: '',
    });
  }

  async onLogin() {
    let login: boolean = await this.authService.loginUser(this.userform.value);
    debugger;
    console.log(login);
    if (login) {
      let redirect = localStorage.getItem('redirectAfterLogin');
      let roleId = parseInt(localStorage.getItem('userRole') || '0');


      if (redirect) {
        this.router.navigateByUrl(redirect);
      } else if (roleId == 1) {
        this.router.navigate(['home']);
      } else if (roleId == 2) {
        this.router.navigate(['admin', 'dashboard']);
      }

      localStorage.removeItem('redirectAfterLogin');
    } else {
      console.log('wrong credentials');
    }
  }

  onRegister() {
    this.router.navigateByUrl('/register');
  }
}
