import { IsInt, IsOptional, IsString } from "class-validator";
import { AddressEntity } from "../entity/address.entity";

export class ReturnAddressDto {
    complement: string;
    numberAddress: number;
    cep: string;

    constructor(address: AddressEntity) {
        this.complement = address.complement;
        this.numberAddress = address.numberAddress;
        this.cep = address.cep;
    }
}