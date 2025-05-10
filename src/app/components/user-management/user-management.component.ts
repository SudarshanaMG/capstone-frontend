import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service'; // Adjust path if needed
import { User } from '../../models/user.model'; // Adjust path if needed
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  users: User[] = [];
  selectedUser: User | null = null;
  editForm: FormGroup;
  isEditing = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required], // Password field for update
      role: ['', Validators.required],
      contactNumber: [''],
      address: this.fb.group({
        line1: [''],
        city: [''],
        state: [''],
        pincode: ['']
      })
    });
  }

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.authService.getAllUsers().subscribe({
      next: (data) => this.users = data,
      error: (err) => console.error('Error fetching users:', err)
    });
  }

  editUser(user: User) {
    this.selectedUser = user;
    this.isEditing = true;
    this.editForm.patchValue({
      name: user.name,
      email: user.email,
      password: '', // Optionally leave password blank for update
      role: user.role,
      contactNumber: user.contactNumber || '',
      address: user.address || {}
    });
  }

  saveUser() {
    if (this.editForm.valid && this.selectedUser?.email) {
      const updates = this.editForm.value;
      this.authService.updateUser(this.selectedUser.email, updates).subscribe({
        next: (updatedUser) => {
          const index = this.users.findIndex(u => u.email === updatedUser.email);
          if (index !== -1) {
            this.users[index] = updatedUser;
          }
          this.cancelEdit();
        },
        error: (err) => console.error('Update failed:', err)
      });
    }
  }

  cancelEdit() {
    this.isEditing = false;
    this.selectedUser = null;
    this.editForm.reset();
  }

  deleteUser(userId: string) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.authService.deleteUser(userId).subscribe({
        next: () => {
          this.users = this.users.filter(user => user._id !== userId);
        },
        error: (err) => console.error('Delete failed:', err)
      });
    }
  }

}
