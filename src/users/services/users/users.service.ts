import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/typeorm/entities/User';
import { CreateUserParams, UpdateUserParams, createUserProfileParams } from 'src/utils/types';
import { Profile } from 'src/typeorm/entities/Profile';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Profile) private profileRepository: Repository<Profile>
    ) { }

    findUser() {
        return this.userRepository.find();
    }

    createUser(userDetails: CreateUserParams) {
        const newUser = this.userRepository.create({ ...userDetails, createdAt: new Date() });
        this.userRepository.save(newUser)
    }

    updateUser(id:number, updateUserDetails:UpdateUserParams){
        return this.userRepository.update({id},{...updateUserDetails})
    }

    deleteUser(id:number){
        return this.userRepository.delete({id});
    }

    async createUserProfile(id:number,createProfileDetails: createUserProfileParams){
        const user = await this.userRepository.findOneBy({ id });
        if(!user) throw new HttpException('User not found. Cannot create Profile',
        HttpStatus.BAD_REQUEST,
        );
        const newProfile = this.profileRepository.create(createProfileDetails);
        const savedProfile  = await this.profileRepository.save(newProfile);
         user.profile = savedProfile;
         return this.userRepository.save(user);
    } 
}
