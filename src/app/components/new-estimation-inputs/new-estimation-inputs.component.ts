import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserInputService } from '../../services/user-input.service';

@Component({
  selector: 'app-new-estimation-inputs',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-estimation-inputs.component.html',
  styleUrl: './new-estimation-inputs.component.css'
})
export class NewEstimationInputsComponent implements OnInit{
  inputForm!: FormGroup;

  constructor(private fb: FormBuilder, private inputService: UserInputService) {}

  ngOnInit(): void {
    this.inputForm = this.fb.group({
      length: [null, Validators.required],
      width: [null, Validators.required],
      phoneNumber: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      constructionType: ['residential', Validators.required],
      totalFloor: [1, Validators.required],
      propertyName: ['', Validators.required],
      landclearence: [false],
      materialQuality: ['', Validators.required],
      contractorId: ['']
    });
  }

  onSubmit(): void {
    if (this.inputForm.valid) {
      this.inputService.addInput(this.inputForm.value).subscribe({
        next: (res: any) => {
          alert('Input submitted successfully!');
          this.inputForm.reset();
        },
        error: (err: any) => {
          alert('Failed to submit input: ' + err.message);
        }
      });
    }
  }
}
