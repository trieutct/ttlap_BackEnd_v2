import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ProductOrderBy } from "../product.constants";
import { CommonListQuery } from "src/common/interfaces";

export class createDto{
    @IsNotEmpty({ message: 'Không được để trống' })
    @IsString({ message: 'Tên sản phẩm phải là một chuỗi' })
    name: string;

    @IsNotEmpty({ message: 'Không được để trống' })
    price: number;

    @IsNotEmpty({ message: 'Không được để trống' })
    quantity: number;
    
    @IsNotEmpty({ message: 'Không được để trống' })
    @IsString()
    description: string;

    @IsString()
    @IsOptional()
    imageUrl?: string;
}
export class updateDto{
    @IsNotEmpty({ message: 'Không được để trống' })
    @IsString({ message: 'Tên sản phẩm phải là một chuỗi' })
    name: string;

    @IsNotEmpty({ message: 'Không được để trống' })
    price: number;

    @IsNotEmpty({ message: 'Không được để trống' })
    quantity: number;
    
    @IsNotEmpty({ message: 'Không được để trống' })
    @IsString()
    description: string;

    @IsString()
    @IsOptional()
    imageUrl?: string;
}


export class GetProductListQuery extends CommonListQuery {
    orderBy?: ProductOrderBy;
}
