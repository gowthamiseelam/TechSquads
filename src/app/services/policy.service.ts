// src/app/services/policy.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PolicyService {
  private apiUrl = 'https://api.example.com/policies'; // ← your real API URL

  constructor(private http: HttpClient) {}

  getPolicyById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // later you can add addPolicy(), updatePolicy(), etc.
}
