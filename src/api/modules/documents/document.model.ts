import type ApiResponseDto from "@/api/dto/api-response.dto";
import ApiModelUtil from "@/utils/api-model.util";
import type DocumentDto from "./document.dto";
import ApiRequestDto from "@/api/dto/api-request.dto";

export default class DocumentModel extends ApiModelUtil {
    constructor() {
        super('document')
    }

    public getAll(): Promise<ApiResponseDto<DocumentDto[]>> {
        return this.unauthorizedRequest(
            new ApiRequestDto('', 'GET')
        )
    }
}