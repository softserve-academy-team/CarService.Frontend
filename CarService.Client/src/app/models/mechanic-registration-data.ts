import { CustomerRegistrationData } from './customer-registration-data';

export class MechanicRegistrationData extends CustomerRegistrationData {
    experience: number;
    price: number;
    specialization: string;
}