import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContractorService } from '../../services/contractor.service';

@Component({
  selector: 'app-contractor-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contractor-login.component.html',
  styleUrl: './contractor-login.component.css'
})

export class ContractorLoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private contractorService: ContractorService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.contractorService.login(email, password).subscribe({
        next: (response) => {
            this.router.navigate(['/contractor/dashboard']);
        },
        error: (error: Error) => {
          console.log('Login error:', error);
          this.errorMessage = error.message;
        }
      });
    }
  }
} 