export interface Employee {
    id: number;
    fullname: string;
    phone: string;
    email: string;
    role: string;
    regdate?: Date;
    lastlogdate?: string; // Make lastlogdate optional to align with the backend
    profileImage?: string;
    selected?: boolean;
  }
  