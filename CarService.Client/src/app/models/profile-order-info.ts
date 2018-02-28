import { OrderStatus } from "../components/order-status";

export class ProfileOrderInfo {
    orderId: number = 12345;
    date = new Date(Date.now());
    status: OrderStatus = OrderStatus.Active;
    markName: string = "Mercedes";
    modelName: string = "Benz";
    year: number = 2008;
    photoLink: string = "https://img-c.drive.ru/models.photos/0000/000/000/000/de2/48d45147112b1286-large.jpg";
}