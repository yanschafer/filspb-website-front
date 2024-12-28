export default class ArticleListDto {
    constructor(
        public date: number,
        public name: string, 
        public shortDescription: string, 
        public image: string, 
    ) {}
}