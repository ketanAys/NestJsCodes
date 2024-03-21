import { Body, Controller, Get, Post, Put ,Param,ParseIntPipe, Delete} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import {  UpdateUserDto } from 'src/users/dtos/UpdateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';
import { CreateUserProfileDto } from 'src/users/dtos/CreateUserProfile.dto';
@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) {

    }

    @Get()
    async getUsers() {
        const users = await this.userService.findUser();
        return users;
     }

    @Post()
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.userService.createUser(createUserDto)
    }

    @Put(':id')
    async updateUserById(
        @Param('id',ParseIntPipe)id:number,
        @Body() updateUserDto: UpdateUserDto 
        ) {
        await this.userService.updateUser(id,updateUserDto)
    }

    @Delete(':id')
    async deleteUserById(
        @Param('id',ParseIntPipe) id:number){
            await this.userService.deleteUser(id);
        }

    @Post(':id/profiles')
    createUserProfile(
        @Param('id',ParseIntPipe) id:number,
        @Body() createUserProfileDto:CreateUserProfileDto,
        ) {
        return this.userService.createUserProfile(id, createUserProfileDto);
    }
     

}
