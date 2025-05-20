// estimate.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserInput } from '../models/user-input.model';

export interface MaterialEstimate {
  _id: string;
  inputId: string;
  totalCost: number;
  materials: {
    resourceName: string;
    resourceQuantity: number;
    unitPrice: string;
    cost: number;
  }[];
  createdAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class EstimateService {
  private baseUrl = 'http://localhost:3005/api/material'; // Adjust to match your backend route
    // input: UserInput | undefined;

  constructor(private http: HttpClient) {}

  // getEstimateByInputId(inputId: string): Observable<MaterialEstimate> {
  //   return this.http.get<MaterialEstimate>(`${this.baseUrl}/estimate/${inputId}`);
  // }

  getEstimateByInputId(inputId: String): Observable<MaterialEstimate> {
    let headers = new HttpHeaders();

    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
      }
    }
    // console.log(headers);
    // const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get<MaterialEstimate>(`${this.baseUrl}/estimate/${inputId}`, { headers });
  }

  calculateEstimateByInputId(input: UserInput): Observable<any> {
    let headers = new HttpHeaders();

    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      console.log(token);
      if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
      }
    }
    // console.log(headers);
    // const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.post<any>(`${this.baseUrl}/calculate`, input, { headers });
  }
  
}

