import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js'; // Import Chart.js

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  // Dummy data for illustration (replace with real API calls)
  numOfCustomers: number = 1000;  // Number of customers in the system
  totalPolicies: number = 5000;   // Total number of policies in the system
  activePolicies: number = 4000;  // Active policies count
  totalClaims: number = 350;      // Total number of claims
  activeClaims: number = 200;     // Active claims count
  pendingClaims: number = 150;    // Pending claims count

  constructor() { }

  ngOnInit(): void {
    // Call a service to fetch the actual data from backend if needed
    // For example, if using HttpClient service:
    // this.dataService.getStatistics().subscribe(response => {
    //   this.numOfCustomers = response.numOfCustomers;
    //   this.totalPolicies = response.totalPolicies;
    //   this.activePolicies = response.activePolicies;
    //   this.totalClaims = response.totalClaims;
    //   this.activeClaims = response.activeClaims;
    //   this.pendingClaims = response.pendingClaims;
    // });

    // Initialize charts (for example using Chart.js)
    this.initializeCharts();
  }

  initializeCharts(): void {
    // Policy Type Distribution Chart
    const policyTypeChart = new Chart('policyTypeChart', {
      type: 'pie', // You can also use 'bar', 'line', etc.
      data: {
        labels: ['Term Life', 'Health', 'Auto', 'Home'],
        datasets: [{
          data: [30, 25, 20, 25],  // Example data for policy types
          backgroundColor: ['#FF5733', '#33FF57', '#3357FF', '#FF33B5'],
          borderColor: '#fff',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: function(tooltipItem) {
                return tooltipItem.raw + '%';
              }
            }
          }
        }
      }
    });

    // Claim Status Overview Chart
    const claimStatusChart = new Chart('claimStatusChart', {
      type: 'bar',
      data: {
        labels: ['Approved', 'Pending', 'Denied'],
        datasets: [{
          label: 'Claims Status',
          data: [120, 150, 30],  // Example data for claims status
          backgroundColor: '#0056b3',
          borderColor: '#003366',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
