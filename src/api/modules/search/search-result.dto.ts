export default class SearchResultDto {
    constructor(
        public id: number,
        public name: string,
        public shortDescription: string,
        public image: string,
        public isArticle: number
    ) {}
}