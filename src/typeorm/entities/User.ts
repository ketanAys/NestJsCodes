import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { Profile } from './Profile';

@Entity({name:'users'})
export class User{

@PrimaryGeneratedColumn({type:'bigint'})
id:number;


@Column({unique:true})
username:string;

@Column()
password:string;

@Column({type:'timestamp'})
createdAt:Date;

@Column({nullable:true})
authStrategy: string; 

@OneToOne(() => Profile)
@JoinColumn()
profile:Profile;

}