import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth';

@Component({
  selector: 'app-landing',
  imports: [],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class LandingComponent {
  constructor(private router: Router, private authService: AuthService) {}

  goToTickets() {
    this.router.navigate(['/tickets']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
