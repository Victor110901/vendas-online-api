import { UpdatePasswordDTO } from "../dtos/update-password.dto";

export const updatePasswordMock: UpdatePasswordDTO = {
    lastPassword: '$2b$10$X4lBnPLF.uiJhUUW0dbTFe0Ulhgh4Delb4OMsYKfK6VZUcj4oCf7O',
    newPassword: 'asdfasd'
}

export const updatePasswordInvalidMock: UpdatePasswordDTO = {
    lastPassword: 'sadasd',
    newPassword: 'asdafs'
}