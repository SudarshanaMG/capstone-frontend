import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Contractor } from '../models/contractor.model';
import { LoginPayload } from '../models/login.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ContractorService {
  private baseUrl = 'http://localhost:3003/api/contractor';

  constructor(private http: HttpClient, private router: Router) {}

    login(email: string, password: string): Observable<{ token: string}> {
      const payload: LoginPayload = { email, password };
      return this.http.post<{ token: string}>(`${this.baseUrl}/login`, payload).pipe(
        tap(response => {
          localStorage.setItem('token', response.token);
        }),
        catchError((error) => {
          console.log(error);
          const message = error.error?.message || 'Login failed';
          return throwError(() => new Error(message));
        })
      );
    }

    logout(): void {
      localStorage.removeItem('token');
      this.router.navigate(['/contractor/login']);
    }

  getAllContractors(): Observable<Contractor[]> {
    return this.http.get<Contractor[]>(`${this.baseUrl}`);
  }

  getContractorById(id: string): Observable<Contractor> {
    return this.http.get<Contractor>(`${this.baseUrl}/${id}`);
  }

  addContractor(contractorData: Contractor): Observable<Contractor> {
    return this.http.post<Contractor>(`${this.baseUrl}/addcontractor`, contractorData);
  }

  updateAvailability(id: string, available: boolean): Observable<Contractor> {
    const params = new HttpParams().set('available', available.toString());
    return this.http.patch<Contractor>(`${this.baseUrl}/${id}/availability`, null, { params });
  }

  getAvailableContractors(specialization: string): Observable<Contractor[]> {
    const params = new HttpParams().set('specialization', specialization);
    return this.http.get<Contractor[]>(`${this.baseUrl}/available`, { params });
  }

  findContractorIdBySpecialization(specialization: string): Observable<{ contractorId: string }> {
    const params = new HttpParams().set('specialization', specialization);
    return this.http.get<{ contractorId: string }>(`${this.baseUrl}/specialization`, { params });
  }

  // getContractorWithInputs(id: string): Observable<{ newcontractor: Contractor, inputs: any[] }> {
  //   return this.http.get<{ newcontractor: Contractor, inputs: any[] }>(`${this.baseUrl}/${id}/with-inputs`);
  // }

  getContractorWithInputs(contractorId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${contractorId}/with-inputs`);
  }

  updateContractor(id: string, contractorData: any) {
    return this.http.put(`${this.baseUrl}/${id}`, contractorData);
  }
  
  deleteContractor(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
