import { OrderStatus } from "../components/order-status";
import { ReviewProposition } from "./review-proposition";

export class CustomerOrderInfo {
    orderId: number;
    status: OrderStatus;
    date: string;
    autoRiaId: number;
    markName: string;
    modelName: string;
    year: number;
    photoLink: string;
    reviewPropositions: ReviewProposition[];
    mechanicId: number;
    reviewId: number;
}