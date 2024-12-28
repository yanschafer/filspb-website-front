import type ApiResponseDto from "@/api/dto/api-response.dto";
import ApiModelUtil from "@/utils/api-model.util";
import type PlatformDto from "./platform.dto";
import ApiRequestDto from "@/api/dto/api-request.dto";

export default class PlatformModel extends ApiModelUtil {
    constructor() {
        super('platform')
    }

    public getAll(): Promise<ApiResponseDto<PlatformDto[]>> {
        return this.unauthorizedRequest(
            new ApiRequestDto('', 'GET')
        )
    }
}