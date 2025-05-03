import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent {
  profile = {
    fullName: '',
    dob: '',
    gender: '',
    phone: '',
    email: '',
    aadharNo: '',
    password: ''
  };

  errors: string[] = [];

  onSubmit(form: NgForm) {
    this.errors = [];

    // Full Name
    if (!this.profile.fullName) {
      this.errors.push('Full Name is required.');
    } else if (!/^[A-Za-z\s]+$/.test(this.profile.fullName)) {
      this.errors.push('Full Name can only contain letters.');
    }

    // Date of Birth
    if (!this.profile.dob) {
      this.errors.push('Date of Birth is required.');
    }

    // Gender
    if (!this.profile.gender) {
      this.errors.push('Gender is required.');
    }

    // Phone
    if (!this.profile.phone) {
      this.errors.push('Phone Number is required.');
    } else if (!/^\d{10}$/.test(this.profile.phone)) {
      this.errors.push('Phone Number must be exactly 10 digits.');
    }

    // Email
    if (!this.profile.email) {
      this.errors.push('Email Address is required.');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.profile.email)) {
      this.errors.push('Email Address must be valid.');
    }

    // Aadhar
    if (!this.profile.aadharNo) {
      this.errors.push('Aadhar Number is required.');
    } else if (!/^\d{12}$/.test(this.profile.aadharNo)) {
      this.errors.push('Aadhar Number must be exactly 12 digits.');
    }

    // Password
    if (!this.profile.password) {
      this.errors.push('Password is required.');
    } else if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,20}$/.test(this.profile.password)) {
      this.errors.push('Password must be 8–20 chars, include 1 uppercase, 1 number, 1 special char.');
    }

    if (this.errors.length) {
      // show all errors in one alert
      alert('Please fix the following errors:\n\n' + this.errors.join('\n'));
    } else {
      // success
      alert('Profile Updated Successfully!');
      console.log('Profile updated:', this.profile);
    }
  }
}
