import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';  // <-- Ensure FormsModule is imported

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],  // <-- Fix: Import FormsModule
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  role: string = 'customer';  // Default role

  constructor(private router: Router) {}

  login() {
    console.log('Login attempted with role:', this.role);
    
    // Save the role to localStorage
    localStorage.setItem('role', this.role.toUpperCase());  // 'ADMIN' or 'CUSTOMER'
    
    // Navigate based on role
    if (this.role === 'admin') {
      this.router.navigate(['/admin-dashboard']);
    } else {
      this.router.navigate(['/customer-dashboard']);
    }
  }
}
