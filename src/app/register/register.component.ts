import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  userform;
  constructor(
    public fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.userform = fb.group({
      email: '',
      password: '',
      firstName: '',
      lastName: '',
    });
  }

  onSignUp() {
    this.authService
      .registerNewUser(this.userform.value)
      .subscribe((response) => {

        if (response.isSuccess == true) {
          this.router.navigate(['login']);
        } else {
          console.log('Error saving request');
        }
        
      });
  }
}
