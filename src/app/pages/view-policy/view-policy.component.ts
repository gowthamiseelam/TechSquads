// src/app/pages/view-policy/view-policy.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  selector: 'app-view-policy',
  templateUrl: './view-policy.component.html',
  styleUrls: ['./view-policy.component.scss']
})
export class ViewPolicyComponent implements OnInit {
  policy: any;
  isAdmin = true;
  loading = true;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Simulate admin or customer
    this.isAdmin = false; // Change to true to simulate admin login

    // Simulate loading and data retrieval
    setTimeout(() => {
      const id = this.route.snapshot.paramMap.get('id');

      // Only proceed if id is present
      if (id) {
        this.policy = {
          policyId: 'POL123456',
          policyType: 'Health Insurance',
          startDate: new Date('2023-01-01'),
          endDate: new Date('2028-01-01'),
          term: '5 years',
          coverageType: 'Comprehensive',
          coverageAmount: 100000,
          premiumAmount: 1200,
          paymentFrequency: 'Annual',
          beneficiaries: ['Alice', 'Bob'],
          paymentHistory: [
            { date: new Date('2023-01-01'), amount: 1200 },
            { date: new Date('2024-01-01'), amount: 1200 }
          ],
          outstanding: 0,
          totalPaid: 2400,
          claimStatus: 'Approved',
          claimHistory: [
            { date: new Date('2023-06-15'), amount: 5000, status: 'Settled' }
          ],
          nextClaimPeriod: new Date('2025-06-15')
        };
      }

      this.loading = false;
    }, 1000); // Simulate delay
  }
}
