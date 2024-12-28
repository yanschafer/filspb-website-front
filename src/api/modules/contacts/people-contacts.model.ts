import ApiModelUtil from "@/utils/api-model.util";
import type PersonContactDto from "./person-contact.dto";
import ApiRequestDto from "@/api/dto/api-request.dto";
import type ApiResponseDto from "@/api/dto/api-response.dto";

export default class PeopleContactsModel extends ApiModelUtil {
    constructor() {
        super('people/contacts')
    }

    public getAll(): Promise<ApiResponseDto<PersonContactDto[]>> {
        return this.unauthorizedRequest(
            new ApiRequestDto('', 'GET')
        )
    }
}