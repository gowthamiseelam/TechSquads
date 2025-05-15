import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface Policy {
  policyName: string;
  policyType: string;
  StartDate: string | Date;
  EndDate: string | Date;
  premiumAmount: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [CommonModule, RouterModule, HttpClientModule]
})
export class DashboardComponent implements OnInit {
  user: any = null;
  policies: Policy[] = [];  // use the interface here

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('jwtToken');

    if (storedUser) {
      this.user = JSON.parse(storedUser);
      this.policies = (this.user.policies || []).map((policy: Policy) => ({
        ...policy,
        StartDate: new Date(policy.StartDate),
        EndDate: new Date(policy.EndDate)
      }));
    } else if (token) {
      this.http.get<any>('https://localhost:7185/api/user/profile', {
        headers: { Authorization: `Bearer ${token}` }
      }).subscribe({
        next: (res) => {
          this.user = res;
          this.policies = (res.policies || []).map((policy: Policy) => {
            console.log('Raw StartDate:', policy.StartDate, 'Raw EndDate:', policy.EndDate);
            return {
              ...policy,
              StartDate: new Date(policy.StartDate),
              EndDate: new Date(policy.EndDate)
            };
          });

          localStorage.setItem('user', JSON.stringify(res));
        },
        error: () => {
          localStorage.removeItem('jwtToken');
          this.router.navigate(['/login']);
        }
      });
    } else {
      this.router.navigate(['/login']);
    }
  }
}
