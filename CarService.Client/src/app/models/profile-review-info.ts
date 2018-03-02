export class ProfileReviewInfo {
    constructor(
        public reviewId?: number,
        public date?: string,
        public markName?: string,
        public modelName?: string,
        public year?: number,
        public photoLink?: string,
        public city?: string
    ) { }
}