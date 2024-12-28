import type ApiResponseDto from '@/api/dto/api-response.dto';
import ApiModelUtil from '../../../utils/api-model.util';
import type EventDto from './event.dto';
import ApiRequestDto from '@/api/dto/api-request.dto';
export default class EventModel extends ApiModelUtil {
    constructor() {
        super('event')
    }

    public getLastFour(): Promise<ApiResponseDto<EventDto[]>> {
        return this.unauthorizedRequest(
            new ApiRequestDto(`last/4`, 'GET')
        )
    }

    public getByPeriod(start: number, end: number): Promise<ApiResponseDto<EventDto[]>> {
        return this.unauthorizedRequest(
            new ApiRequestDto(`period/${start}/${end}`, 'GET')
        )
    }

    public getOne(id: number): Promise<ApiResponseDto<EventDto>> {
        return this.unauthorizedRequest(
            new ApiRequestDto(`${id}`, 'GET')
        )
    }
}