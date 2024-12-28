import type ApiResponseDto from "@/api/dto/api-response.dto";
import ApiModelUtil from "@/utils/api-model.util";
import type DepContactDto from "./dep-contact.dto";
import ApiRequestDto from "@/api/dto/api-request.dto";

export default class DepContactsModel extends ApiModelUtil {
    constructor() {
        super('department/contacts')
    }

    public getAll(): Promise<ApiResponseDto<DepContactDto[]>> {
        return this.unauthorizedRequest(
            new ApiRequestDto('', 'GET')
        )
    }
}