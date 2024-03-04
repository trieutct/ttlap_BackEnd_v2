import { IsNotEmpty, IsNumber, IsOptional, IsString, Matches } from "class-validator";
import {  UserOrderBy } from "../user.constant";
import { CommonDto, CommonListQuery } from "../../../common/interfaces";
import { IsNotFutureDate } from "../../../modules/decorator/is-not-future-date.decorator";
import { Regex } from "../../../common/constants";
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
export class createUserDto extends CommonDto{
    @IsNotEmpty({ message: 'Không được để trống' })
    @IsString({ message: 'Phải là một chuỗi' })
    @Matches(Regex.NAME,{message:"Tên không đúng định dạng"})
    name: string;

    @IsString({ message: 'Phải là một chuỗi' })
    @Matches(emailRegex, { message: 'Email không đúng định dạng' })
    @IsNotEmpty({message:'Vui lòng nhập đầy đủ thông tin'})
    email: string;

    @IsOptional()
    @IsString({ message: 'Phải là một chuỗi' })
    @Matches(Regex.PASSWORD,{message:"Password không đúng định dạng"})
    password?: string;

    @IsNotEmpty({ message: 'Không được để trống' })
    @IsString({ message: 'Phải là một chuỗi' })
    @IsNotFutureDate({ message: 'Ngày sinh không được ở tương lai' })
    birthday: string;

    @IsNotEmpty({ message: 'Không được để trống' })
    @IsString({ message: 'Phải là một chuỗi' })
    @Matches(Regex.PHONE,{message:"Phone không phù hợp"})
    phone: string;
    
    
    @IsString()
    @IsOptional()
    role?: string;

    @IsNotEmpty({ message: 'Ảnh không được để trống' })
    @IsString({ message: 'Ảnh phải là một chuỗi' })
    @Matches(Regex.URL,{message:"Url không hợp lệ"})
    avatar: string;
}


export class UpdateUserDto extends CommonDto{
    @IsNotEmpty({ message: 'Không được để trống' })
    @IsString({ message: 'Phải là một chuỗi' })
    @Matches(Regex.NAME,{message:"Tên không đúng định dạng"})
    name: string;

    @IsString({ message: 'Phải là một chuỗi' })
    @Matches(emailRegex, { message: 'Email không đúng định dạng' })
    @IsNotEmpty({message:'Vui lòng nhập đầy đủ thông tin'})
    email: string;

    @IsOptional()
    @IsString({ message: 'Phải là một chuỗi' })
    @Matches(Regex.PASSWORD,{message:"Password không đúng định dạng"})
    password?: string;

    @IsNotEmpty({ message: 'Không được để trống' })
    @IsString({ message: 'Phải là một chuỗi' })
    @IsNotFutureDate({ message: 'Ngày sinh không được ở tương lai' })
    birthday: string;

    @IsNotEmpty({ message: 'Không được để trống' })
    @IsString({ message: 'Phải là một chuỗi' })
    @Matches(Regex.PHONE,{message:"Phone không phù hợp"})
    phone: string;
    
    
    @IsString()
    @IsOptional()
    role?: string;

    @IsNotEmpty({ message: 'Ảnh không được để trống' })
    @IsString({ message: 'Ảnh phải là một chuỗi' })
    @Matches(Regex.URL,{message:"Url không hợp lệ"})
    avatar: string;
}

export class GetUserListQuery extends CommonListQuery {
    orderBy?: UserOrderBy;
    phone?:string
}
