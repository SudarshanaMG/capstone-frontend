import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service'; // Adjust path if needed
import { User } from '../../models/user.model'; // Adjust path if needed
import { Router, RouterModule } from '@angular/router';
import { UserInput } from '../../models/user-input.model';
import { ContractorService } from '../../services/contractor.service';
import { UserInputService } from '../../services/user-input.service';

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
    inputs: UserInput[] = [];
    isLoading = true;
    error: string | null = null;
  contractorName?: string;
  isViewing = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private contractorService: ContractorService, private inputService: UserInputService) {
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      // password: ['', Validators.required], // Password field for update
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
    // console.log(user);
    this.isEditing = true;
    this.editForm.patchValue({
      name: user.name,
      email: user.email,
      role: user.role,
      contactNumber: user.contactNumber || '',
      address: user.address || {}
    });
  }

  saveUser() {
    if (this.editForm.valid && this.selectedUser?.email) {
      const updates = this.editForm.value;
      this.authService.updateUser(this.selectedUser._id!, updates).subscribe({
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
    this.fetchUsers();
  }

  cancelView() {
    this.isViewing = false;
    this.fetchUsers();
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

  loadInputs(email: string): void {
    this.isLoading = true;
  
    this.inputService.getInputsByEmail(email).subscribe({
      next: (data: UserInput[]) => {
        this.inputs = [];
  
        let remaining = data.length;
  
        if (remaining === 0) {
          this.isLoading = false;
          return;
        }
  
        data.forEach((input) => {
          if (input.contractorId) {
            this.contractorService.getContractorById(input.contractorId).subscribe({
              next: (contractor: any) => {
                input.contractorName = contractor.name;
                this.inputs.push(input);
                if (--remaining === 0) this.isLoading = false;
              },
              error: (err) => {
                console.error('Error fetching contractor:', err);
                this.inputs.push(input);
                if (--remaining === 0) this.isLoading = false;
              }
            });
          } else {
            this.inputs.push(input);
            if (--remaining === 0) this.isLoading = false;
          }
        });
      },
      error: (err) => {
        this.error = 'Failed to load estimation data. Please try again later.';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  @Input() input!: UserInput;
  @Output() viewDetails = new EventEmitter<string>();
  @Output() editInput = new EventEmitter<string>();

  getQualityClass(quality: string): string {
    switch(quality.toLowerCase()) {
      case 'premium':
        return 'quality-premium';
      case 'Luxury':
        return 'quality-standard';
      case 'basic':
        return 'quality-economy';
      default:
        return '';
    }
  }

  viewInputs(email: string){
    // this.viewDetails.emit(userId);
    this.isViewing = true;
    // this.viewDetails.emit(userId);
    this.loadInputs(email);
  }

  onViewDetails(input: UserInput): void {
    this.router.navigate([`/estimate`, input._id]);
  }
  
  onEdit(input: UserInput): void {
    // console.log('Edit input:', input);
    this.router.navigate(['/add-input'], { state: { inputData: input } });
  }
  
  getArea(): number {
    return this.input.length * this.input.width;
  }

}
