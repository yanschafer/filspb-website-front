import ApiModelUtil from "@/utils/api-model.util";
import type ReviewCreateDto from "./review-create.dto";
import ApiRequestDto from "@/api/dto/api-request.dto";
import type ApiResponseDto from "@/api/dto/api-response.dto";

export default class ReviewModel extends ApiModelUtil {
    constructor() {
        super('review')
    }

    public create(reviewCreateDto: ReviewCreateDto): Promise<ApiResponseDto<any>> {
        return this.unauthorizedRequest(
            new ApiRequestDto('', 'POST', reviewCreateDto)
        )
    }
}