export default class ReviewCreateDto {
    constructor(
        public date: number,
        public eventId: number,
        public name: string,
        public review: string
    ) {}
}