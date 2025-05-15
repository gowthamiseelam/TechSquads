import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],  // Ensure ReactiveFormsModule is included
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  error = ''; // To store error messages for display

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
      email: ['', [Validators.required, Validators.email]],
      aadhaarCard: ['', [Validators.required, Validators.pattern(/^\d{12}$/)]],
      password: ['', [Validators.required, this.passwordValidator]],
      confirmPassword: ['', Validators.required],
      role: ['user', Validators.required]
    }, {
      validators: this.matchPasswords
    });

  }

  // Custom password validation
  passwordValidator(): ValidatorFn {
    return (control) => {
      const value = control.value;
      const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);  // Check for special characters
      const hasDigit = /\d/.test(value);  // Check for digits
      const isValid = hasSpecial && hasDigit && value.length >= 8;  // Password length must be >= 8
      return isValid ? null : { invalidPassword: true };  // Return error if invalid
    };
  }

  // Password matching validation function
  matchPasswords(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const password = group.get('password')?.value;
      const confirmPassword = group.get('confirmPassword')?.value;
      return password === confirmPassword ? null : { mismatch: true };  // Check if passwords match
    };
  }

  // On form submission, send data to the backend
  onRegister() {
    if (this.registerForm.invalid) return;  // Check if the form is valid before proceeding

    const { name, dateOfBirth, email,phoneNumber, aadhaarCard, password, confirmPassword, role } = this.registerForm.value;

    this.http.post('https://localhost:7185/api/Auth/register', {
      name,
      dateOfBirth,
      email,
      phoneNumber,
      aadhaarCard,
      password,
      confirmPassword,
      role,
      policies: [] 
    }).subscribe({
      next: () => this.router.navigate(['/login']),
      error: (err) => {
        this.error = err.error?.message || 'Registration failed. Please try again.';
      }
    });
    
  }


  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  get role() {
    return this.registerForm.get('role');
  }

  get phoneNumber() {
    return this.registerForm.get('phoneNumber');
  }

  get aadhaarCard() {
    return this.registerForm.get('aadhaarCard');
  }

  get name() {
    return this.registerForm.get('name');
  }

  get dateOfBirth() {
    return this.registerForm.get('dateOfBirth');
  }
}

