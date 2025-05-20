// contractor-dashboard.component.ts
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { ContractorService } from '../../services/contractor.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { UserInput } from '../../models/user-input.model';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from '../../services/auth.service';
import { NewEstimationInputsComponent } from '../new-estimation-inputs/new-estimation-inputs.component';
import { EstimateService } from '../../services/estimation.service';

@Component({
  selector: 'app-contractor-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contractor-dashboard.component.html',
  styleUrl: './contractor-dashboard.component.css'
})
export class ContractorDashboardComponent implements OnInit {
  contractor: any;
  inputs: UserInput[] = [];
  estimations: { [inputId: string]: number } = {};

  constructor(
    private contractorService: ContractorService,
    private estimateService: EstimateService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decodedToken: any = jwtDecode(token);
          const contractorId = decodedToken.id || decodedToken._id;

          if (contractorId) {
            this.contractorService.getContractorWithInputs(contractorId).subscribe({
              next: (data) => {
                this.contractor = data.newcontractor;
                this.inputs = data.inputs;
                console.log(data.inputs);
              },
              error: (err) => {
                console.error('Failed to load contractor data', err);
              }
            });
          }
        } catch (err) {
          console.error('Invalid token:', err);
        }
      }
    }
  }

  shouldShowNavbar(): boolean {
    return !['/login', '/register', '/contractor/login'].includes(this.router.url);
  }

  logout() {
    this.contractorService.logout();
  }
  
  // calculateEstimation(input: UserInput): void {
  //   console.log(input);
  //   console.log(this.estimateService.calculateEstimateByInputId(input));
  // }

  // calculateEstimation(input: UserInput): void {
  //   console.log('Input:', input);
  //   alert("Successfully Estimated!!!");
  //   this.estimateService.calculateEstimateByInputId(input).subscribe({
  //     next: (response) => {
  //       console.log('Estimation Response:', response);
  //       // you can assign this to a variable if needed, e.g. this.estimation = response;
  //     },
  //     error: (err) => {
  //       console.error('Estimation failed:', err);
  //     }
  //   });
  // }

  calculateEstimation(input: UserInput): void {
    this.estimateService.calculateEstimateByInputId(input).subscribe({
      next: (response) => {
        console.log('Estimation Response:', response);
        this.estimations[input._id] = response.totalCost;
        alert("Successfully Estimated!!! Total: ₹" + response.totalCost.toLocaleString());
      },
      error: (err) => {
        console.error('Estimation failed:', err);
      }
    });
  }
  
}
