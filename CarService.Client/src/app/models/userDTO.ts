export class UserDTO {
    constructor(
        public email?: string,
        public firstName?: string,
        public lastName?: string,
        public phoneNumber?: string,
        public city?: string,
        public cardNumber?: string,
        public workExperience?: number,
        public specialization?: string,
        public mechanicRate?: number
    ) { }
}