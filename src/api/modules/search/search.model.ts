import ApiRequestDto from "@/api/dto/api-request.dto";
import type ApiResponseDto from "@/api/dto/api-response.dto";
import ApiModelUtil from "@/utils/api-model.util";
import type SearchResultDto from "./search-result.dto";

export default class SearchModel extends ApiModelUtil {
    constructor() {
        super('search/all')
    }

    public find(query: string): Promise<ApiResponseDto<SearchResultDto>> {
        return this.unauthorizedRequest(
            new ApiRequestDto(`${query}`, 'GET')
        )
    }
}