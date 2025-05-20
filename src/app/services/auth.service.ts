import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID  } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { User } from '../models/user.model';
import { LoginPayload } from '../models/login.model';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL = 'http://localhost:3001/api/users'; // Replace with your backend URL

  constructor(private http: HttpClient, private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {}

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  register(user: User): Observable<any> {
    return this.http.post(`${this.API_URL}/register`, user);
  }

  // Login user
  login(email: string, password: string, role: string): Observable<{ token: string; role: string }> {
    const payload: LoginPayload = { email, password };
    return this.http.post<{ token: string; role: string }>(`${this.API_URL}/login`, payload).pipe(
      tap(response => {
        if (this.isBrowser()) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('role', role);
        }
      }),
      catchError((error) => {
        console.log(error);
        const message = error.error?.message || 'Login failed';
        return throwError(() => new Error(message));
      })
    );
  }
  
  

  logout(): void {
    if (this.isBrowser()) {
      localStorage.removeItem('token');
      localStorage.removeItem('userType');
    }
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.isBrowser() && !!localStorage.getItem('token');
  }

  private handleError(error: HttpErrorResponse) {
    let message = 'An unknown error occurred!';
    if (error.error && error.error.message) {
      message = error.error.message;
    }
    return throwError(() => new Error(message));
  }

  private getAuthHeaders(): HttpHeaders {
    if (this.isBrowser()) {
      const token = localStorage.getItem('token');
      if (token) {
        return new HttpHeaders({ Authorization: `Bearer ${token}` });
      }
    }
    return new HttpHeaders();
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.API_URL}/all`, {
      headers: this.getAuthHeaders()
    });
  }

  getProfile(): Observable<User> {
    return this.http.get<User>(`${this.API_URL}/profile`, {
      headers: this.getAuthHeaders()
    });
  }

  getPhoneNumber(): Observable<String> {
    return this.http.get<String>(`${this.API_URL}/phoneNumber`, {
      headers: this.getAuthHeaders()
    });
  }

  updateUser(id: string, updates: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.API_URL}/profile/${id}`, updates, {
      headers: this.getAuthHeaders()
    });
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/profile/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  forgotPassword(): Observable<any> {
    return this.http.post(`${this.API_URL}/forgot-password`, {}, {
      headers: this.getAuthHeaders()
    });
  }

  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.API_URL}/reset-password/${token}`, {
      newPassword
    });
  }

}
