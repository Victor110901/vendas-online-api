import { Controller, Get, Param } from '@nestjs/common';
import { CityEntity } from './entity/city.entity';
import { CityService } from './city.service';

@Controller('city')
export class CityController {

    constructor(private readonly cityService: CityService) {}

    @Get('/:stateId')
    async getAllCitiesByStateId(
        @Param('state_id') stateId: number,
    ): Promise<CityEntity[]> {
        return this.cityService.getAllCitiesByStateId(stateId);
    }
}
