import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private apiUrl = 'http://localhost:3000/api/tickets';

  constructor(private http: HttpClient) {}

  private getHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getTickets(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  createTicket(ticket: any): Observable<any> {
    return this.http.post(this.apiUrl, ticket, { headers: this.getHeaders() });
  }

  updateTicket(id: string, ticket: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, ticket, { headers: this.getHeaders() });
  }
}
