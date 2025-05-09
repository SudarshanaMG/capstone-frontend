import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      // TODO: Implement actual authentication service
      // For now, we'll just navigate to the dashboard
      this.router.navigate(['/contractor/dashboard']);
    } else {
      this.errorMessage = 'Please fill in all fields correctly';
    }
  }
} 