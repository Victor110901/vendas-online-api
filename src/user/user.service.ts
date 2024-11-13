import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create.user.dto';
import { User } from './interfaces/user.interface';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
    private users: User[] = [];

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const saltOrRounds = 10;

        const passwordHash = await hash(createUserDto.password, saltOrRounds);

        const user = {
            ...createUserDto,
            id: this.users.length + 1,
            password: passwordHash
        }

        this.users.push(user);

        return user;
    }

    async getAllUser(): Promise<User[]> {
        return this.users;
    }
}
