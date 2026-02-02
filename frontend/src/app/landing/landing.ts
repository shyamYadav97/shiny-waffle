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
  isMenuOpen: boolean = false;
  constructor(private router: Router, private authService: AuthService) {}


  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  goToTickets(): void {
    // Navigate to tickets page
    this.router.navigate(['/tickets']);
    this.closeMenu();
  }

  createTicket(): void {
    // Navigate to create ticket page
    this.router.navigate(['/tickets/create']);
    this.closeMenu();
  }

  logout(): void {
    // Add your logout logic here
    // Example: this.authService.logout();
    
    if (confirm('Are you sure you want to logout?')) {
      // Clear session/token
      localStorage.removeItem('token');
      sessionStorage.clear();
      
      // Navigate to login page
      this.router.navigate(['/login']);
    }
  }

}
