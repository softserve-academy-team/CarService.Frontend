import { OrderStatus } from "../components/order-status";
import { ReviewProposition } from "./review-proposition";

export class CustomerOrderInfo {
    orderId: number = 123794;
    autoRiaId: number = 1121233;
    markName: string;
    modelName: string;
    year: number;
    photoLink: string;
    carPhotoUrl: string = "https://cdn2.autocentre.ua/wp-content/uploads/2017/10/2018-Audi-A7-Sportback-14CSP.jpg";
    orderStatus: OrderStatus = OrderStatus.Active;
    reviewPropositions: ReviewProposition[];
    reviewId: number;
}