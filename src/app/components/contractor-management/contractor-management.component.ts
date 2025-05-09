import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContractorService } from '../../services/contractor.service';
import { Contractor } from '../../models/contractor.model';

@Component({
  selector: 'app-contractor-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contractor-management.component.html',
  styleUrls: ['./contractor-management.component.css']
})
export class ContractorManagementComponent implements OnInit {
  contractors: Contractor[] = [];
  selectedContractor: Contractor | null = null;
  editForm: FormGroup;
  isEditing = false;
  specializations = ['NewConstruction', 'Renovation', 'InteriorDesign'];

  constructor(private fb: FormBuilder, private contractorService: ContractorService) {
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contactNumber: ['', Validators.required],
      specialization: ['', Validators.required],
      rating: [null],
      available: [true, Validators.required]
    });
  }

  ngOnInit() {
    this.fetchContractors();
  }

  fetchContractors() {
    this.contractorService.getAllContractors().subscribe(data => {
      this.contractors = data;
    });
  }

  editContractor(contractor: Contractor) {
    this.selectedContractor = contractor;
    this.isEditing = true;
    this.editForm.patchValue({
      name: contractor.name,
      email: contractor.email,
      contactNumber: contractor.contactNumber,
      specialization: contractor.specialization,
      rating: contractor.rating,
      available: contractor.available
    });
  }

  saveContractor() {
    if (this.editForm.valid && this.selectedContractor) {
      const updatedContractor = {
        ...this.selectedContractor,
        ...this.editForm.value
      };

      this.contractorService.updateContractor(updatedContractor._id, updatedContractor).subscribe(() => {
        const index = this.contractors.findIndex(c => c._id === updatedContractor._id);
        if (index !== -1) {
          this.contractors[index] = updatedContractor;
        }
        this.cancelEdit();
      });
    }
  }

  cancelEdit() {
    this.isEditing = false;
    this.selectedContractor = null;
    this.editForm.reset();
  }

  deleteContractor(contractorId: string | undefined) {
    if (!contractorId) {
      console.error('Invalid contractor ID');
      return;
    }
  
    this.contractorService.deleteContractor(contractorId).subscribe(() => {
      this.contractors = this.contractors.filter(c => c._id !== contractorId);
    });
  }

  getSpecializationLabel(spec: string): string {
    return spec.charAt(0).toUpperCase() + spec.slice(1).replace(/([A-Z])/g, ' $1');
  }
}
