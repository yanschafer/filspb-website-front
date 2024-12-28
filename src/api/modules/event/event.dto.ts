export default class EventDto {
    constructor(
        public date: number,
        public time: string,
        public eventTime: string,
        public image: string, 
        public name: string,
        public shortDescription: string,
        public description: string,
        public platformName: string,
        public platformAddress: string,
        public authors: string,
        public tags: string[],
        public purchaseLink: string,
        public price: string,
        public soldOut: boolean
    ) {}
}