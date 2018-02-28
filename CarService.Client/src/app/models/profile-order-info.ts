import { OrderStatus } from "../components/order-status";

export class ProfileOrderInfo {
    orderId: number;
    //date = new Date(Date.now());
    date: string;
    status: OrderStatus;
    markName: string;
    modelName: string;
    year: string;
    photoLink: string;
}