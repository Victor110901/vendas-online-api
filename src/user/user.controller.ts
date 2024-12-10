import { Body, Controller, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dtos/create.user.dto';
import { UserService } from './user.service';
import { UserEntity } from './entity/user.entity';
import { ReturnUserDto } from './dtos/return.user.dto';
import { UpdatePasswordDTO } from './dtos/update-password.dto';
import { UserId } from '../decorators/user-id.decorator';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from './enum/user-type.enum';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @UsePipes(ValidationPipe)
    @Post()
    async createUser(@Body() createUser: CreateUserDto): Promise<UserEntity> {
        return this.userService.createUser(createUser);
    }

    @Roles(UserType.Admin)
    @Get()
    async getAllUsers(): Promise<ReturnUserDto[]> {
        return (await this.userService.getAllUser()).map(
            (userEntity) => new ReturnUserDto(userEntity),
        );
    }

    @Roles(UserType.Admin) 
    @Get('/:userId')
    async getUserById(@Param('userId') userId: number): Promise<ReturnUserDto> {
        return new ReturnUserDto(
            await this.userService.getUserByIdUsingRelations(userId)
        )
    }

    @Roles(UserType.Admin, UserType.User)
    @Patch()
    @UsePipes(ValidationPipe)
    async updatePasswordUser(
        @UserId() userId: number,
        @Body() updatePasswordDto: UpdatePasswordDTO
    ): Promise<UserEntity> {
        return this.userService.updatePasswordUser(updatePasswordDto, userId);
    }
}
