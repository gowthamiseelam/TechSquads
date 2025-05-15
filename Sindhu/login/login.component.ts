import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';  // ✅ Import HttpClient

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, ReactiveFormsModule, RouterModule, HttpClientModule]  // ✅ Import HttpClientModule
})
export class LoginComponent {
  loginForm: FormGroup;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient  // ✅ Inject HttpClient
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['user', Validators.required]
    });
  }

  onLogin(): void {
    if (this.loginForm.invalid) {
      this.error = 'Please enter valid credentials.';
      return;
    }

    const { email, password, role } = this.loginForm.value;

    this.http.post<any>('https://localhost:7185/api/Auth/login', {
      email,
      password,
      role
    }).subscribe({
      next: (response) => {
        // Save token if returned by backend
        if (response.token) {
          localStorage.setItem('jwtToken', response.token);
        }

        // Also save the user details to localStorage for dashboard
        if (response.user) {
          localStorage.setItem('user', JSON.stringify(response.user));
        }

        // Redirect to dashboard
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.error = err.error?.message || 'Login failed. Please try again.';
      }
    });
  }
}
