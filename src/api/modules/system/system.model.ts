import type ApiResponseDto from "@/api/dto/api-response.dto";
import ApiModelUtil from "@/utils/api-model.util";
import type SystemDto from "./system.dto";
import ApiRequestDto from "@/api/dto/api-request.dto";

export default class SystemModel extends ApiModelUtil {
    constructor() {
        super('system')
    }

    public getSystemData(): Promise<ApiResponseDto<SystemDto>> {
        return this.unauthorizedRequest(
            new ApiRequestDto('', 'GET')
        )
    }
}