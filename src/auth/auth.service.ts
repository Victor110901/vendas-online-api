import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from '../user/entity/user.entity';
import { LoginDto } from './dtos/login.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ReturnLoginDto } from './dtos/returnLogin.dto';
import { ReturnUserDto } from '../user/dtos/return.user.dto';
import { LoginPayloadDto } from './dtos/loginPayload.dto';
import { validatePassword } from '../utils/password';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    async login(loginDto: LoginDto): Promise<ReturnLoginDto> {
        const user: UserEntity | undefined = await this.userService
            .findUserByEmail(loginDto.email)
            .catch(() => undefined);

        const isMatch = await validatePassword(
            loginDto.password,
            user?.password || ''
        );

        if (!user || !isMatch) {
            throw new NotFoundException('Email or passord invalid')
        }

        return {
            accessToken: this.jwtService.sign({ ...new LoginPayloadDto(user) }),
            user: new ReturnUserDto(user),
        };
    }
}
