import { Injectable } from '@angular/core';
import { UserInput } from '../models/user-input.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserInputService {
  private baseUrl = 'http://localhost:3002/api/input';

  constructor(private http: HttpClient) {}

  getInputsByUser(): Observable<UserInput[]> {
    return this.http.get<UserInput[]>(`${this.baseUrl}/getByName`);
  }

  getInputsByEmail(email: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getByEmail`, {
      params: { email }
    });
  }  

  addInput(inputData: Partial<UserInput>): Observable<UserInput> {
    return this.http.post<UserInput>(`${this.baseUrl}/`, inputData);
  }

  updateInput(id: string, inputData: Partial<UserInput>): Observable<UserInput> {
    return this.http.put<UserInput>(`${this.baseUrl}/${id}`, inputData);
  }
  
  getInputs(): Observable<UserInput[]> {
    return this.http.get<UserInput[]>(`${this.baseUrl}/`);
  }

  getInput(id: string): Observable<UserInput> {
    return this.http.get<UserInput>(`${this.baseUrl}/getid/${id}`);
  }

}
