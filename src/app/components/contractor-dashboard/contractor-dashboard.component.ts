// contractor-dashboard.component.ts
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { ContractorService } from '../../services/contractor.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';

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
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const contractorId = localStorage.getItem('contractorId');
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
  }

  shouldShowNavbar(): boolean {
    return !['/login', '/register', '/contractor/login'].includes(this.router.url);
  }

  logout() {
    this.contractorService.logout();
  }
}
