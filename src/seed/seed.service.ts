import { Injectable } from "@nestjs/common";
import { UserService } from "src/modules/user/service/user.service";
@Injectable()
export class seedService
{
    constructor(private readonly userService:UserService)
    {}
    async seedData()
    {
        const data={
            name:"seed data",
            email:"seed@gmail.com",
            password:"t12345678",
            birthday:"29/07/2002",
            role:"Admin",
            phone:"0941590356",
            avatar:"https://scontent.fhan14-4.fna.fbcdn.net/v/t39.30808-6/429676494_796296932538904_1759082448012527013_n.jpg?stp=dst-jpg_p843x403&_nc_cat=102&ccb=1-7&_nc_sid=3635dc&_nc_ohc=aY3Oym-pC10AX9vOFTr&_nc_ht=scontent.fhan14-4.fna&oh=00_AfCTUQNg84eimGbtbEAqkUIjWg4iaTqBk3esVrtW5q_Jlg&oe=65E09283"
        }
        const user=await this.userService.findUserByEmail(data.email)
        if(!user)
        {
            await this.userService.createUser(data)
        }
    }
}