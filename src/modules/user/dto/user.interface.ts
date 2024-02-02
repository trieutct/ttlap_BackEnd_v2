import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import {  UserOrderBy } from "../user.constant";
import { CommonListQuery } from "src/common/interfaces";

export class createUserDto{
    @IsNotEmpty({ message: 'Không được để trống' })
    @IsString({ message: 'Phải là một chuỗi' })
    name: string;

    @IsNotEmpty({ message: 'Không được để trống' })
    @IsString({ message: 'Phải là một chuỗi' })
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
    
    @IsNotEmpty({ message: 'Không được để trống' })
    @IsString()
    role: string;

    @IsString()
    @IsOptional()
    avatar?: string;
}


export class UpdateUserDto{
    @IsNotEmpty({ message: 'Không được để trống' })
    @IsString({ message: 'Phải là một chuỗi' })
    name: string;

    @IsNotEmpty({ message: 'Không được để trống' })
    @IsString({ message: 'Phải là một chuỗi' })
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
    
    @IsNotEmpty({ message: 'Không được để trống' })
    @IsString()
    role: string;

    @IsString()
    @IsOptional()
    avatar?: string;
}

export class GetUserListQuery extends CommonListQuery {
    orderBy?: UserOrderBy;
}
