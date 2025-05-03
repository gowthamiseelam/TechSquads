import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  // Import CommonModule for common directives like ngIf, ngFor, etc.
import { RouterModule } from '@angular/router';  // Import RouterModule if using routerLink or routerLinkActive

@Component({
  selector: 'app-customer-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],  // Import necessary modules here
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.scss']
})
export class CustomerDashboardComponent {
  searchQuery: string = '';
  policies: any[] = [];

  searchPolicies() {
    // Logic for searching policies
  }
}
