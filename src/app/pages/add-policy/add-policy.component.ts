import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-policy',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './add-policy.component.html',
  styleUrls: ['./add-policy.component.scss']
})
export class AddPolicyComponent {
  policy = {
    policyId: '',
    policyType: '',
    startDate: '',
    endDate: '',
    policyTerm: null as number | null,
    coverageType: '',
    coverageAmount: null as number | null,
    premiumAmount: null as number | null,
    premiumFrequency: ''
  };

  onSubmit(form: NgForm) {
    const errors: string[] = [];

    if (!this.policy.policyId)          errors.push('Policy ID is required.');
    if (!this.policy.policyType)        errors.push('Policy Type is required.');
    if (!this.policy.startDate)         errors.push('Start Date is required.');
    if (!this.policy.endDate)           errors.push('End Date is required.');
    if (this.policy.policyTerm == null) errors.push('Policy Term is required.');
    if (!this.policy.coverageType)      errors.push('Coverage Type is required.');
    if (this.policy.coverageAmount == null) errors.push('Coverage Amount is required.');
    if (this.policy.premiumAmount == null)  errors.push('Premium Amount is required.');
    if (!this.policy.premiumFrequency)  errors.push('Payment Frequency is required.');

    if (errors.length) {
      alert(
        'Please fix the following errors:\n\n' +
        errors.map(e => `• ${e}`).join('\n')
      );
      return;
    }

    alert('Policy added successfully!');
    console.log('New policy:', this.policy);

    // Reset the form
    form.resetForm({
      policyId: '',
      policyType: '',
      startDate: '',
      endDate: '',
      policyTerm: null,
      coverageType: '',
      coverageAmount: null,
      premiumAmount: null,
      premiumFrequency: ''
    });
  }
}
