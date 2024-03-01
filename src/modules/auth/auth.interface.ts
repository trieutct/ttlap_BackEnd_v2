import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches } from "class-validator";
import { RoleCollection } from "../../common/constants";
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
export class LoginDto{
    @Matches(emailRegex, { message: 'Email không đúng định dạng' })
    @IsNotEmpty({message:'Vui lòng nhập đầy đủ thông tin'})
    email: string;
    @IsString()
    @IsNotEmpty({ message: 'Không được để trống' })
    password: string;
}

export class RegisterDto{
    @Matches(emailRegex, { message: 'Email không đúng định dạng' })
    @IsNotEmpty({message:'Vui lòng nhập đầy đủ thông tin'})
    email: string;

    @IsString()
    @IsNotEmpty({ message: 'Không được để trống' })
    password: string;
}