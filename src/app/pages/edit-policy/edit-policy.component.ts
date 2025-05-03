import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface Policy {
  policyId: string;
  policyType: string;
  startDate: string;
  endDate: string;
  policyTerm: number;
  coverageType: string;
  coverageAmount: number;
  premiumAmount: number;
  premiumFrequency: string;
}

@Component({
  selector: 'app-edit-policy',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,   // <-- needed for ngModel
    RouterModule
  ],
  templateUrl: './edit-policy.component.html',
  styleUrls: ['./edit-policy.component.scss']
})
export class EditPolicyComponent implements OnInit {
  // Define the policy object with typing
  policy: Policy = {
    policyId: '',
    policyType: '',
    startDate: '',
    endDate: '',
    policyTerm: 0,
    coverageType: '',
    coverageAmount: 0,
    premiumAmount: 0,
    premiumFrequency: ''
  };

  // Simulating a fetch of policy details (you can replace it with a service call)
  ngOnInit(): void {
    // Normally, you would fetch the policy data from an API or service here.
    // For now, we'll use mock data.
    this.policy = {
      policyId: '12345',
      policyType: 'life',
      startDate: '2022-01-01',
      endDate: '2032-01-01',
      policyTerm: 10,
      coverageType: 'life',
      coverageAmount: 100000,
      premiumAmount: 500,
      premiumFrequency: 'annually'
    };
  }

  onSubmit(): void {
    console.log('Policy updated', this.policy);
    alert('Policy updated!');
    // After submission, you can redirect the user, reset the form, or perform other actions
  }
}
