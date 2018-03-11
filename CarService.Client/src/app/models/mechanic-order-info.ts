import { OrderStatus } from "../components/order-status";

export class MechanicOrderInfo {
    orderId: number;
    status: OrderStatus;
    date: string;
    description: string;
    customerFirstName: string;
    customerLastName: string;
    autoRiaId: number;
    markName: string;
    modelName: string;
    year: number;
    photoLink: string;
    propositionPrice: number;
    propositionComment: string;
    propositionDate: string;
    reviewId: number;
    isDoIt: boolean;
}