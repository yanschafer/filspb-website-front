import type ApiResponseDto from "@/api/dto/api-response.dto";
import ApiModelUtil from "@/utils/api-model.util";
import type RepDto from "./rep.dto";
import ApiRequestDto from "@/api/dto/api-request.dto";

export default class RepModel extends ApiModelUtil {
    constructor() {
        super('event/but/not/event') 
    }

    public getAll(): Promise<ApiResponseDto<RepDto[]>> {
        return this.unauthorizedRequest(
            new ApiRequestDto('repertoire', 'GET')
        )
    }
}