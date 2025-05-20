import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './edit-page.component.html',
  styleUrl: './edit-page.component.css'
})

export class EditProfileComponent {
  user: User = {
    name: '',
    email: '',
    contactNumber: '',
    address: {
      line1: '',
      city: '',
      state: '',
      pincode: ''
    },
    password: ''
  };

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras.state as { userData: User };
    if (state?.userData) {
      this.user = JSON.parse(JSON.stringify(state.userData)); // deep copy
    }
  }

  updateProfile(): void {
    this.authService.updateUser(this.user._id!, this.user).subscribe({
      next: () => {
        alert('Profile updated successfully!');
        this.router.navigate(['/profile']);
      },
      error: (err) => {
        console.error('Failed to update profile', err);
        alert('Failed to update profile.');
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/profile']);
  }
}
