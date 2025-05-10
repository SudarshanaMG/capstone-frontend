// contractor-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContractorService } from '../../services/contractor.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contractor-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contractor-dashboard.component.html',
  styleUrl: './contractor-dashboard.component.css'
})
export class ContractorDashboardComponent implements OnInit {
  contractor: any;
  inputs: any[] = [];

  constructor(
    private contractorService: ContractorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const contractorId = localStorage.getItem('contractorId'); // assuming contractor ID is stored here
    if (contractorId) {
      this.contractorService.getContractorWithInputs(contractorId).subscribe({
        next: (data) => {
          this.contractor = data.newcontractor;
          this.inputs = data.inputs;
        },
        error: (err) => {
          console.error('Failed to load contractor data', err);
        }
      });
    }
  }

  shouldShowNavbar(): boolean {
    return !['/login', '/register', '/contractor/login'].includes(this.router.url);
  }

  logout() {
    localStorage.removeItem('contractorId'); // clear token or ID
    this.router.navigate(['/login']);
  }
}
