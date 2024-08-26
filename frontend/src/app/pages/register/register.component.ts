import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  honeypot: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (this.honeypot) {
      console.log('Bot detected');
      return;
    }

    this.authService.register(this.username, this.password).subscribe(
      (response) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/lists']);
      },
      (error) => {
        this.errorMessage = 'Registration failed: ' + error.error.error;
        console.error('Registration error:', error);
      }
    );
  }
}