import type SeasonEventItemDto from "./season-event-item.dto";

export default class SeasonEventDto {
    constructor(
        public id: number,
        public image: string,
        public name: string,
        public shortDescription: string,
        public description: string,
        public purchaseLink: string,
        public price: string,
        public isActive: string,
        public events: SeasonEventItemDto[]
    ) {}
}