export interface Contractor {
    _id?: string; 
    name: string;
    email: string;
    password: string;
    contactNumber: string;
    experience: number;
    specialization: string;
    available: boolean;
    licenseNumber: string;
    companyName: string;
    serviceAreas: string[];
    rating?: number;
    createdAt?: string;
    updatedAt?: string;
  }
  
