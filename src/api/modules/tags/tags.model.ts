import ApiRequestDto from "@/api/dto/api-request.dto";
import type ApiResponseDto from "@/api/dto/api-response.dto";
import ApiModelUtil from "@/utils/api-model.util";
import type TagDto from "./tag.dto";

export default class TagsModel extends ApiModelUtil {
    constructor() {
        super('tag')
    }

    public getAll(): Promise<ApiResponseDto<TagDto[]>> {
        return this.unauthorizedRequest(
            new ApiRequestDto('', 'GET')
        )
    }
}