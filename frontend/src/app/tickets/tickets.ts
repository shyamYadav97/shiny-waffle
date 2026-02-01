import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TicketService } from '../ticket';
import { AuthService } from '../auth';

@Component({
  selector: 'app-tickets',
  imports: [FormsModule, CommonModule],
  templateUrl: './tickets.html',
  styleUrl: './tickets.css',
})
export class TicketsComponent implements OnInit {
  tickets: any[] = [];
  newTicket = { title: '', description: '' };

  constructor(private ticketService: TicketService, private router: Router, private authService: AuthService) {}

  ngOnInit() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    this.loadTickets();
  }

  loadTickets() {
    this.ticketService.getTickets().subscribe({
      next: (data) => this.tickets = data,
      error: () => this.router.navigate(['/login'])
    });
  }

  createTicket() {
    this.ticketService.createTicket(this.newTicket).subscribe({
      next: () => {
        this.newTicket = { title: '', description: '' };
        this.loadTickets();
      },
      error: (err) => alert('Error creating ticket')
    });
  }

  updateStatus(ticket: any) {
    this.ticketService.updateTicket(ticket._id, { status: ticket.status }).subscribe({
      next: () => this.loadTickets(),
      error: () => alert('Error updating ticket')
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
