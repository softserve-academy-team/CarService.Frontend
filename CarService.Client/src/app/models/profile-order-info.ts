import { OrderStatus } from "../components/order-status";

export class ProfileOrderInfo {
    constructor(
        public orderId?: number,
        public date?: string,
        public status?: OrderStatus,
        public markName?: string,
        public modelName?: string,
        public year?: number,
        public photoLink?: string
    ) { }
}