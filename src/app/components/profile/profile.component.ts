import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  user: User | null = null;
  isLoading = true;
  error: string | null = null;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    // Replace '1' with actual user ID, perhaps from authentication service
    this.authService.getProfile().subscribe({
      next: (userData: any) => {
        this.user = userData;
        this.isLoading = false;
      },
      error: (err: any) => {
        this.error = 'Failed to load user profile';
        this.isLoading = false;
        console.error('Error loading user profile:', err);
      }
    });
  }
  editProfile(): void {
    this.router.navigate(['/edit-page'], {
      state: { userData: this.user }
    });
  }  
}
