import { UserEntity } from "../entity/user.entity";
import { ReturnAddressDto } from "src/address/dtos/returnAddress.dto";

export class ReturnUserDto {
    id: number;
    name: string;
    email: string;
    phone: string;
    cpf: string;
    addresses?: ReturnAddressDto[]

    constructor(userEntity: UserEntity) {
        this.id = userEntity.id;
        this.name = userEntity.name;
        this.email = userEntity.email;
        this.phone = userEntity.phone;
        this.cpf = userEntity.cpf;

        this.addresses = userEntity.address
            ? userEntity.address.map((addres) => new ReturnAddressDto(addres))
            : undefined;
    }

}