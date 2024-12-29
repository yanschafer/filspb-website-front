import ApiModelUtil from "@/utils/api-model.util";
import type ArticleListDto from "./article-list.dto";
import ApiRequestDto from "@/api/dto/api-request.dto";
import type ApiResponseDto from "@/api/dto/api-response.dto";
import type ArticleDto from "./article.dto";

export default class NewsModel extends ApiModelUtil {
    constructor () {
        super('news')
    }

    public getAll(): Promise<ApiResponseDto<ArticleListDto[]>> {
        return this.unauthorizedRequest(
            new ApiRequestDto('', 'GET')
        )
    }


    public getLast(count: number = 4): Promise<ApiResponseDto<ArticleListDto[]>> {
        return this.unauthorizedRequest(
            new ApiRequestDto(`last/${count}`, 'GET')
        )
    }

    public getOne(id: number): Promise<ApiResponseDto<ArticleDto>> {
        return this.unauthorizedRequest(
            new ApiRequestDto(`${id}`, 'GET')
        )
    }
}