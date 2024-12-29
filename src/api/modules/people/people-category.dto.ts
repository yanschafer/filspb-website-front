import type PersonDto from "./person.dto"

export default class PeopleCategoryDto {
    constructor(
        public categoryName: string,
        public people: PersonDto[]
    ) {}
}