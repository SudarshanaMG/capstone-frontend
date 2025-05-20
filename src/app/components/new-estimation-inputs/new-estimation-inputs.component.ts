import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserInputService } from '../../services/user-input.service';
import { ContractorService } from '../../services/contractor.service';
import { Router } from '@angular/router';
import { UserInput } from '../../models/user-input.model';

@Component({
  selector: 'app-new-estimation-inputs',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './new-estimation-inputs.component.html',
  styleUrl: './new-estimation-inputs.component.css'
})
export class NewEstimationInputsComponent implements OnInit {
  inputForm!: FormGroup;
  specialization: string = '';
  contractorId: string | null = null;
  contractorError: string | null = null;
  isEditMode = false;
  inputData: UserInput | null = null;

  constructor(
    private fb: FormBuilder,
    private inputService: UserInputService,
    private contractorService: ContractorService,
    private router: Router
  ) {
    const nav = this.router.getCurrentNavigation();
    this.inputData = nav?.extras?.state?.['inputData'] ?? null;

    if (this.inputData) {
      this.isEditMode = true;
    }
  }

  ngOnInit(): void {
    // Initialize the form
    this.inputForm = this.fb.group({
      length: [null, Validators.required],
      width: [null, Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      constructionType: ['residential', Validators.required],
      totalFloor: [1, Validators.required],
      propertyName: ['', Validators.required],
      landclearence: [false],
      materialQuality: ['', Validators.required],
      contractorId: ['']
    });

    // Get navigation state for edit mode
    // const nav = this.router.getCurrentNavigation();
    // console.log(nav);
    // this.inputData = nav?.extras?.state?.['inputData'] ?? null;
    // console.log(this.inputData);

    if (this.isEditMode && this.inputData) {
      this.inputForm.patchValue(this.inputData as { [key: string]: any });
      this.specialization = this.inputData.constructionType;
    }
  }    

  onSubmit(): void {
    if (this.inputForm.valid) {
      this.findContractor();
      setTimeout(() => {
        // console.log(this.inputForm.value);
        const inputPayload = this.inputForm.value;
  
        if (this.isEditMode && this.inputData?._id) {
          this.inputService.updateInput(this.inputData._id, inputPayload).subscribe({
            next: () => {
              alert('Input updated successfully!');
              this.router.navigate(['/inputs']);
            },
            error: (err) => {
              alert('Failed to update input: ' + err.message);
            }
          });
        } else {
          this.inputService.addInput(inputPayload).subscribe({
            next: () => {
              alert('Input submitted successfully!');
              this.inputForm.reset();
              this.router.navigate(['/inputs']);
            },
            error: (err) => {
              alert('Failed to submit input: ' + err.message);
            }
          });
        }
      }, 1000);
      
    }
  }

  findContractor(): void {
    if (!this.inputForm.value.constructionType.trim()) return;

    this.contractorService.findContractorIdBySpecialization(this.inputForm.value.constructionType).subscribe({
      next: (data) => {
        this.contractorId = data.contractorId;
        // console.log(this.contractorId);
        this.inputForm.patchValue({ contractorId: this.contractorId });
        this.contractorError = null;
      },
      error: (err) => {
        this.contractorError = 'No contractor found for this specialization.';
        this.contractorId = null;
        this.inputForm.patchValue({ contractorId: this.contractorId });
        console.error(err);
      }
    });
  }
}
