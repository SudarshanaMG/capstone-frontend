import { Component, OnInit } from '@angular/core';
import { EstimateService, MaterialEstimate } from '../../services/estimation.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-estimations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './estimations.component.html',
  styleUrl: './estimations.component.css'
})
export class EstimateComponent implements OnInit {
  estimate: MaterialEstimate | null = null;
  isLoading = false;
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
          console.log(this.error);
          this.isLoading = false;
        }
      });
    } else {
      this.error = 'No inputId provided in route.';
      this.isLoading = false;
    }
  }
  downloadPDF(): void {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Material Estimation Report', 14, 20);

    doc.setFontSize(12);
    doc.text(`Total Cost: Rs. ${this.estimate?.totalCost}`, 14, 30);

    autoTable(doc, {
      startY: 40,
      head: [['Material', 'Quantity', 'Unit', 'Cost (Rs.)']],
      body: this.estimate?.materials.map(m => [
        m.resourceName,
        m.resourceQuantity,
        m.unitPrice,
        m.cost
      ])
    });

    doc.save('material-estimate.pdf');
  }
}
