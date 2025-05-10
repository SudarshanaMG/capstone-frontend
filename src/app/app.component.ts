import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
  constructor(public router: Router, private authService: AuthService) {}

  shouldShowNavbar(): boolean {
    return !['/login', '/register', '/dashboard', '/contractor/login', '/admin/users', '/admin/contractors', '/contractor/dashboard'].includes(this.router.url);
  }
  logout() {
    this.authService.logout();  // Calls logout from AuthService
    // this.router.navigate(['/login']);  // Redirect to login page
  }

}
