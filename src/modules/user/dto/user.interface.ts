import { IsNotEmpty, IsNumber, IsOptional, IsString, Matches } from "class-validator";
import {  UserOrderBy } from "../user.constant";
import { CommonListQuery } from "src/common/interfaces";
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

export class createUserDto{
    @IsNotEmpty({ message: 'Không được để trống' })
    @IsString({ message: 'Phải là một chuỗi' })
    name: string;

    @IsString({ message: 'Phải là một chuỗi' })
    @Matches(emailRegex, { message: 'Email không đúng định dạng' })
    @IsNotEmpty({message:'Vui lòng nhập đầy đủ thông tin'})
    email: string;

    @IsNotEmpty({ message: 'Không được để trống' })
    @IsString({ message: 'Phải là một chuỗi' })
    password: string;

    @IsNotEmpty({ message: 'Không được để trống' })
    @IsString({ message: 'Phải là một chuỗi' })
    birthday: string;

    @IsNotEmpty({ message: 'Không được để trống' })
    @IsString({ message: 'Phải là một chuỗi' })
    phone: string;
    
    
    @IsString()
    @IsOptional()
    role?: string;

    @IsString()
    @IsOptional()
    avatar?: string;
}


export class UpdateUserDto{
    @IsNotEmpty({ message: 'Không được để trống' })
    @IsString({ message: 'Phải là một chuỗi' })
    name: string;

    @IsString({ message: 'Phải là một chuỗi' })
    @Matches(emailRegex, { message: 'Email không đúng định dạng' })
    @IsNotEmpty({message:'Vui lòng nhập đầy đủ thông tin'})
    email: string;

    @IsNotEmpty({ message: 'Không được để trống' })
    @IsString({ message: 'Phải là một chuỗi' })
    password: string;

    @IsNotEmpty({ message: 'Không được để trống' })
    @IsString({ message: 'Phải là một chuỗi' })
    birthday: string;

    @IsNotEmpty({ message: 'Không được để trống' })
    @IsString({ message: 'Phải là một chuỗi' })
    phone: string;
    
    @IsString()
    @IsOptional()
    role?: string;

    @IsString()
    @IsOptional()
    avatar?: string;
}

export class GetUserListQuery extends CommonListQuery {
    orderBy?: UserOrderBy;
}
