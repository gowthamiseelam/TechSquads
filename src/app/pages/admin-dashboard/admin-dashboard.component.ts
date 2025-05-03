import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  // For ngIf, ngFor, etc.
import { RouterModule } from '@angular/router';  // For routerLink, routerLinkActive

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {
  searchQuery: string = '';
  policies: any[] = [];

  searchPolicies() {
    // Logic to handle search functionality
    console.log('Searching for:', this.searchQuery);
    // You can add real logic here
  }
}
