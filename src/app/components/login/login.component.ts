import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // Import AuthService
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  userType: string = '';
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService, // Inject AuthService
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userType = params['userType'];
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password, this.userType).subscribe({
        next: (response) => {
          const role = response.role;
  
          if (role === 'admin') {
            this.router.navigate(['/dashboard']);
          } else if (role === 'homeowner') {
            this.router.navigate(['/home']);
          } else {
            this.errorMessage = 'Unknown user role.';
          }
        },
        error: (error: Error) => {
          console.log('Login error:', error);
          this.errorMessage = error.message;
        }
      });
    }
  }
  
  
}
