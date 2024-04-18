export interface Employee {
    id: number
    fullname: string;
    role: string;
    regdate?: Date;
    lastlogdate: string;
    selected?: boolean;
    email: string;
    phone: string;
}
