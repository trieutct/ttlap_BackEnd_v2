import { IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min,Matches } from "class-validator";
import { ProductOrderBy } from "../product.constants";
import { CommonDto, CommonListQuery } from "../../../common/interfaces";
import { MAX_PRICE, MAX_QUANTITY, MIN_PRICE, MIN_QUANTITY } from "../../../common/constants";

export class createDto extends CommonDto{
    @IsNotEmpty({ message: 'Không được để trống' })
    @IsString({ message: 'Tên sản phẩm phải là một chuỗi' })
    @Matches(/^[a-zA-Z0-9\sÀ-ỹ]+$/u,{message:"Tên sản phẩm không hợp lệ"})
    name: string;

    @IsNotEmpty({ message: 'Không được để trống' })
    @Matches(/^-?\d+(\.\d+)?$/, { message: 'Giá tiền không hợp lệ' })
    price: number;

    @IsNotEmpty({ message: 'Không được để trống' })
    @Matches(/^-?\d+(\.\d+)?$/, { message: 'Số lượng không hợp lệ' })
    quantity: number;
    
    @IsOptional()
    @IsString()
    description?: string;

    @IsString()
    @IsOptional()
    imageUrl?: string;
}
export class updateDto extends CommonDto{
    @IsNotEmpty({ message: 'Không được để trống' })
    @IsString({ message: 'Tên sản phẩm phải là một chuỗi' })
    @Matches(/^[a-zA-Z0-9\sÀ-ỹ]+$/u,{message:"Tên sản phẩm không hợp lệ"})
    name: string;

    @IsNotEmpty({ message: 'Không được để trống' })
    @Matches(/^-?\d+(\.\d+)?$/, { message: 'Giá tiền không hợp lệ' })
    price: number;

    @IsNotEmpty({ message: 'Không được để trống' })
    @Matches(/^-?\d+(\.\d+)?$/, { message: 'Số lượng không hợp lệ' })
    quantity: number;
    
    @IsOptional()
    @IsString()
    description?: string;

    @IsString()
    @IsOptional()
    imageUrl?: string;
}


export class GetProductListQuery extends CommonListQuery {
    orderBy?: ProductOrderBy;
}
