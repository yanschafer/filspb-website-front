import type ApiResponseDto from "@/api/dto/api-response.dto";
import ApiModelUtil from "@/utils/api-model.util";
import type PersonDto from "./person.dto";
import ApiRequestDto from "@/api/dto/api-request.dto";
import type PeopleCategoryDto from "./people-category.dto";

export default class PeopleModel extends ApiModelUtil {
    constructor () {
        super('people')
    }

    public getAll(): Promise<ApiResponseDto<PeopleCategoryDto[]>> {
        return this.unauthorizedRequest(
            new ApiRequestDto('', 'GET')
        )
    }
}