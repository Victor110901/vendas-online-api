import { cityMock } from "../../city/__mocks__/city.mock";
import { AddressEntity } from "../entity/address.entity";
import { userEntityMock } from "../../user/__mock__/user.mock";

export const addressMock: AddressEntity = {
    cep: '4561564',
    cityId: cityMock.id,
    complement: 'asdfa',
    createdAt: new Date(),
    id: 56489,
    numberAddress: 654,
    updatedAt: new Date(),
    userId: userEntityMock.id,
}