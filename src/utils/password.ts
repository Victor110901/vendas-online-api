import { compare } from "bcrypt"

export const validatePassword = async (
    password: string,
    passwordHash: string
): Promise<boolean> => {
    return compare(password, passwordHash);
}