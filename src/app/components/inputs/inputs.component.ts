import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserInputService } from '../../services/user-input.service';
import { UserInput } from '../../models/user-input.model';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ContractorService } from '../../services/contractor.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inputs',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './inputs.component.html',
  styleUrl: './inputs.component.css'
})
export class InputsComponent {
  inputs: UserInput[] = [];
  isLoading = true;
  error: string | null = null;
  // contractorId?: string;
contractorName?: string; // Add this field


  constructor(private inputService: UserInputService,
    private contractorService: ContractorService, private router: Router) {}

  ngOnInit(): void {
    this.loadInputs();
  }

  // loadInputs(): void {
  //   this.isLoading = true;
  //   this.inputService.getInputs().subscribe({
  //     next: (data: any) => {
  //       this.inputs = data;
  //       this.isLoading = false;
  //     },
  //     error: (err: any) => {
  //       this.error = 'Failed to load estimation data. Please try again later.';
  //       this.isLoading = false;
  //       console.error(err);
  //     }
  //   });
  // }
  
  loadInputs(): void {
    this.isLoading = true;
  
    this.inputService.getInputs().subscribe({
      next: (data: UserInput[]) => {
        this.inputs = [];
  
        let remaining = data.length;
  
        if (remaining === 0) {
          this.isLoading = false;
          return;
        }
  
        data.forEach((input) => {
          if (input.contractorId) {
            this.contractorService.getContractorById(input.contractorId).subscribe({
              next: (contractor: any) => {
                input.contractorName = contractor.name;
                this.inputs.push(input);
                if (--remaining === 0) this.isLoading = false;
              },
              error: (err) => {
                console.error('Error fetching contractor:', err);
                this.inputs.push(input); // still push input without name
                if (--remaining === 0) this.isLoading = false;
              }
            });
          } else {
            this.inputs.push(input);
            if (--remaining === 0) this.isLoading = false;
          }
        });
      },
      error: (err) => {
        this.error = 'Failed to load estimation data. Please try again later.';
        this.isLoading = false;
        console.error(err);
      }
    });
  }
  

  @Input() input!: UserInput;
  @Output() viewDetails = new EventEmitter<string>();
  @Output() editInput = new EventEmitter<string>();

  getQualityClass(quality: string): string {
    switch(quality.toLowerCase()) {
      case 'premium':
        return 'quality-premium';
      case 'Luxury':
        return 'quality-standard';
      case 'basic':
        return 'quality-economy';
      default:
        return '';
    }
  }

  onViewDetails(input: UserInput): void {
    this.router.navigate([`/estimate`, input._id]);
  }
  

  onEdit(input: UserInput): void {
    // console.log('Edit input:', input);
    this.router.navigate(['/add-input'], { state: { inputData: input } });
  }
  

  getArea(): number {
    return this.input.length * this.input.width;
  }

  // getContractor(contractorId: string){
  //   this.contractorService.getContractorById(contractorId).subscribe({
  //                 next: (contractor: any) => {
  //                   this.contractorName = contractor.name;
  //                   // this.inputs.push(input);
  //                   // if (--remaining === 0) this.isLoading = false;
  //                 },
  //                 error: (err) => {
  //                   console.error('Error fetching contractor:', err);
  //                   // this.inputs.push(input); // still push without name
  //                   // if (--remaining === 0) this.isLoading = false;
  //                 }
  //               });
  // }
}
