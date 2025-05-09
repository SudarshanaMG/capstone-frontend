export interface Address {
    line1: string;
    city: string;
    state: string;
    pincode: string;
  }
  
  export interface User {
    _id?: string;
    name: string;
    email: string;
    password: string;
    role?: 'admin' | 'homeowner'; // optional for registration form (backend sets default)
    contactNumber?: string;
    address?: Address;
    createdAt?: Date;
  }
  