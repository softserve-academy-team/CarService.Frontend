import { OrderStatus } from "../components/order-status";
import { ReviewProposition } from "./review-proposition";

export class CustomerOrderInfo {
    orderId: number = 123794;
    status: OrderStatus = OrderStatus.Active;
    date: string = "08-09-2017";
    autoRiaId: number = 20454797;
    markName: string = "Kia";
    modelName: string = "E5";
    year: number = 2015;
    photoLink: string = "https://cdn2.autocentre.ua/wp-content/uploads/2017/10/2018-Audi-A7-Sportback-14CSP.jpg";
    reviewPropositions: ReviewProposition[] = [
       new ReviewProposition(),
       new ReviewProposition(),
       new ReviewProposition() 
];
    mechanicId: number;
    reviewId: number;
}