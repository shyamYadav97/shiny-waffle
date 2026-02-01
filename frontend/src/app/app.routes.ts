import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { LandingComponent } from './landing/landing';
import { TicketsComponent } from './tickets/tickets';

export const routes: Routes = [
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'landing', component: LandingComponent },
  { path: 'tickets', component: TicketsComponent },
];
