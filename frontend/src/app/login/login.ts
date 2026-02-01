import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login(this.username, this.password).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/landing']);
      },
      error: (err) => {
        alert('Login failed');
      }
    });
  }

  onRegister() {
    this.authService.register(this.username, this.password).subscribe({
      next: () => {
        alert('Registered successfully');
      },
      error: (err) => {
        alert('Registration failed');
      }
    });
  }
}
