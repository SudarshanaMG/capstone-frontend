import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserInputService } from '../../services/user-input.service';
import { UserInput } from '../../models/user-input.model';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

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

  constructor(private inputService: UserInputService, private router: Router) {}

  ngOnInit(): void {
    this.loadInputs();
  }

  loadInputs(): void {
    this.isLoading = true;
    this.inputService.getInputs().subscribe({
      next: (data: any) => {
        this.inputs = data;
        this.isLoading = false;
      },
      error: (err: any) => {
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
  

  onEdit(): void {
    this.editInput.emit(this.input._id);
  }

  getArea(): number {
    return this.input.length * this.input.width;
  }
}
