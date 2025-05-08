// estimate.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface MaterialEstimate {
  _id: string;
  inputId: string;
  totalCost: number;
  materials: {
    name: string;
    quantity: number;
    unit: string;
    cost: number;
  }[];
  createdAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class EstimateService {
  private baseUrl = 'http://localhost:3005/api/material'; // Adjust to match your backend route

  constructor(private http: HttpClient) {}

  // getEstimateByInputId(inputId: string): Observable<MaterialEstimate> {
  //   return this.http.get<MaterialEstimate>(`${this.baseUrl}/estimate/${inputId}`);
  // }

  getEstimateByInputId(inputId: string): Observable<MaterialEstimate> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get<MaterialEstimate>(`${this.baseUrl}/estimate/${inputId}`, { headers });
  }
  
}

