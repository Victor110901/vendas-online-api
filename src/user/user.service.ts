import { BadGatewayException, BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/create.user.dto';
import { UserEntity } from './entity/user.entity';
import { hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdatePasswordDTO } from './dtos/update-password.dto';
import { validatePassword } from 'src/utils/password';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
        const user = await this.findUserByEmail(createUserDto.email).catch(
            () => undefined,
        );

        if (user) {
            throw new BadGatewayException('Email registered in system');
        }

        const saltOrRounds = 10;

        const passwordHash = await hash(createUserDto.password, saltOrRounds);

        return this.userRepository.save({
            ...createUserDto,
            typeUser: 1,
            password: passwordHash
        })
    }

    async getUserByIdUsingRelations(userId: number): Promise<UserEntity> {
        return this.userRepository.findOne({
            where: {
                id: userId,
            },
            relations: {
                address: {
                    city: {
                        state: true
                    }
                },

            },
        })
    }

    async getAllUser(): Promise<UserEntity[]> {
        return this.userRepository.find();
    }

    async findUserById(userId: number): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where: {
                id: userId
            }
        });

        if (!user) {
            throw new NotFoundException(`UserId: ${userId} Not Found`);
        }

        return user;
    }

    async findUserByEmail(email: string): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where: {
                email,
            }
        });

        if (!user) {
            throw new NotFoundException(`Email: ${email} Not Found`);
        }

        return user;
    }

    async updatePasswordUser(updatePasswordUserDto: UpdatePasswordDTO, userId: number): Promise<UserEntity> {
        const user = await this.findUserById(userId);

        const saltOrRounds = 10;

        const passwordHash = await hash(updatePasswordUserDto.newPassword, saltOrRounds);

        const isMatch = await validatePassword(
            updatePasswordUserDto.lastPassword,
            user.password || '',
        );

        if (!isMatch) {
            throw new BadRequestException('Last password invalid');
        }

        return this.userRepository.save({
            ...user,
            password: passwordHash
        })
    }
}
