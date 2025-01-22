import type ApiResponseDto from "@/api/dto/api-response.dto"
import ApiModelUtil from "@/utils/api-model.util"
import type SeasonEventDto from "./season-event.dto"
import ApiRequestDto from "@/api/dto/api-request.dto"

export default class SeasonEventModel extends ApiModelUtil {
    constructor() {
        super('event/season')
    }

    public getAll(): Promise<ApiResponseDto<SeasonEventDto>> {
        return this.unauthorizedRequest(
            new ApiRequestDto('', 'GET')
        )
    }

    public getLast(count: number): Promise<ApiResponseDto<SeasonEventDto>> {
        return this.unauthorizedRequest(
            new ApiRequestDto(`last/${count}`, 'GET')
        )
    }

    public getOne(id: number): Promise<ApiResponseDto<SeasonEventDto>> {
        return this.unauthorizedRequest(
            new ApiRequestDto(`${id}`, 'GET')
        )
    }
}