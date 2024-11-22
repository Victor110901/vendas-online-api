import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateAddressDto } from './dtos/createAddress.dto';
import { AddressService } from './address.service';
import { AddressEntity } from './entity/address.entity';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from '../user/enum/user-type.enum';
import { UserId } from '../decorators/user-id.decorator';
import { ReturnAddressDto } from './dtos/returnAddress.dto';

@Roles(UserType.User, UserType.Admin)
@Controller('address')
export class AddressController {

    constructor(private readonly addressService: AddressService) {}

    @Post()
    @UsePipes(ValidationPipe)
    async createAddress(
        @Body() createAddressDto: CreateAddressDto,
        @UserId() userId: number
    ): Promise<AddressEntity> {
        return this.addressService.createAddress(createAddressDto, userId);
    }
    
    @Get()
    @UsePipes(ValidationPipe)
    async findAddressByUserId(
        @UserId() userId: number
    ): Promise<ReturnAddressDto[]> {
        return (await this.addressService.findAddressByUserId(userId)).map(
            (address) => new ReturnAddressDto(address),
        );
    }
}
