import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
    type:"mysql",
    host:"localhost",
    port:3306,
    username:"root",
    password:"AYS@1234",
    database:"first_database",
    entities:[],
    synchronize:true,
  }),
    UsersModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
