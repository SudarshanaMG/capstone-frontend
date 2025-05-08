import { Component, OnInit } from '@angular/core';
import { EstimateService, MaterialEstimate } from '../../services/estimation.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-estimations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './estimations.component.html',
  styleUrl: './estimations.component.css'
})
export class EstimateComponent implements OnInit {
  estimate: MaterialEstimate | null = null;
  isLoading = true;
  error: string = '';

  constructor(
    private estimateService: EstimateService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const inputId = this.route.snapshot.paramMap.get('inputId');
    if (inputId) {
      this.estimateService.getEstimateByInputId(inputId).subscribe({
        next: (data: any) => {
          this.estimate = data;
          this.isLoading = false;
        },
        error: (err: any) => {
          this.error = err.error.message || 'Failed to load estimate.';
          this.isLoading = false;
        }
      });
    } else {
      this.error = 'No inputId provided in route.';
      this.isLoading = false;
    }
  }
}
