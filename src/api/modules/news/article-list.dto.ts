export default class ArticleListDto {
    constructor(
        public id: number,
        public date: number,
        public name: string, 
        public shortDescription: string, 
        public image: string, 
    ) {}
}