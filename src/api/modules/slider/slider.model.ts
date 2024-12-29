import type ApiResponseDto from "@/api/dto/api-response.dto";
import ApiModelUtil from "@/utils/api-model.util";
import type SlideDto from "./slide.dto";
import ApiRequestDto from "@/api/dto/api-request.dto";

export default class SliderModel extends ApiModelUtil {
    constructor() {
        super('slider')
    }

    public getSlides(): Promise<ApiResponseDto<SlideDto[]>> {
        return this.unauthorizedRequest(
            new ApiRequestDto('', 'GET')
        )
    }
}