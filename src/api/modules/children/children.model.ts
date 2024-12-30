import type ApiResponseDto from "@/api/dto/api-response.dto";
import ApiModelUtil from "@/utils/api-model.util";
import type ChildrenDto from "./children.dto";
import ApiRequestDto from "@/api/dto/api-request.dto";

export default class ChildrenModel extends ApiModelUtil {
    constructor() {
        super('children/programs')
    }

    public getAll(): Promise<ApiResponseDto<ChildrenDto>> {
        return this.unauthorizedRequest(
            new ApiRequestDto('', 'GET')
        )
    }
}