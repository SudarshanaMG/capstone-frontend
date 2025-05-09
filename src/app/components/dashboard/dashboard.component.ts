import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(public router: Router) {}

  shouldShowNavbar(): boolean {
    return !['/login', '/register', '/dashboard'].includes(this.router.url);
  }

  navigateToUsers() {
    this.router.navigate(['/admin/users']);
  }

  navigateToContractors() {
    this.router.navigate(['/admin/contractors']);
  }

  logout() {
    // TODO: Implement logout functionality
    this.router.navigate(['/login']);
  }
}
