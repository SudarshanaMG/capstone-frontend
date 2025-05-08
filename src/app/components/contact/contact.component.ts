import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface ContactData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  contactData: ContactData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  onSubmit() {
    if (this.contactData.name && 
        this.contactData.email && 
        this.contactData.subject &&
        this.contactData.message) {
      // TODO: Implement actual contact form submission logic here
      console.log('Contact form submitted:', this.contactData);
      // Reset form after successful submission
      this.contactData = {
        name: '',
        email: '',
        subject: '',
        message: ''
      };
    }
  }
}