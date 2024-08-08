export interface AccessLog {
    id: number;
    employeeId: number; 
    accessDateTime: Date;
    accessType: string;
    roleAtAccess: string;
    fingerprint1:string;
    fingerprint2?: string;
  }
  