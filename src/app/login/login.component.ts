import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
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

    let login:boolean = await this.authService.loginUser(this.userform.value);
    
    console.log(login);
    if (login) {
      this.router.navigateByUrl('/home');
    } else {
      console.log('wrong credentials');
    }
  }

  onRegister() {
    this.router.navigateByUrl('/register');
  }
}
