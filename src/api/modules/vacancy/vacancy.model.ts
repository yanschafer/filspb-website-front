import type ApiResponseDto from "@/api/dto/api-response.dto";
import ApiModelUtil from "@/utils/api-model.util";
import type VacancyDto from "./vacancy.dto";
import ApiRequestDto from "@/api/dto/api-request.dto";

export default class VacancyModel extends ApiModelUtil {
    constructor() {
        super('vacancy')
    }

    public getAll(): Promise<ApiResponseDto<VacancyDto[]>> {
        return this.unauthorizedRequest(
            new ApiRequestDto('', 'GET')
        )
    }
}