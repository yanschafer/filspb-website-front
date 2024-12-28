import type ApiResponseDto from "@/api/dto/api-response.dto";
import ApiModelUtil from "@/utils/api-model.util";
import type PartnerDto from "./partner.dto";
import ApiRequestDto from "@/api/dto/api-request.dto";

export default class PartnersModel extends ApiModelUtil {
    constructor() {
        super('partners')
    }

    public getAll(): Promise<ApiResponseDto<PartnerDto[]>> {
        return this.unauthorizedRequest(
            new ApiRequestDto('', 'GET')
        )
    }
}