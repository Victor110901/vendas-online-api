import { UserEntity } from "../entity/user.entity";
import { UserType } from "../enum/user-type.enum";

export const userEntityMock: UserEntity = {
    cpf: '12345678901',
    createdAt: new Date(),
    email: 'emailMock@gmail.com',
    id: 4242,
    name: 'NameMock',
    password: '$2b$10$X4lBnPLF.uiJhUUW0dbTFe0Ulhgh4Delb4OMsYKfK6VZUcj4oCf7O',
    phone: '983500468',
    typeUser: UserType.User,
    updatedAt: new Date(),
};