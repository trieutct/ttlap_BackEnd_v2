import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ProductOrderBy } from "../product.constants";
import { CommonDto, CommonListQuery } from "../../../common/interfaces";

export class createDto extends CommonDto{
    @IsNotEmpty({ message: 'Không được để trống' })
    @IsString({ message: 'Tên sản phẩm phải là một chuỗi' })
    name: string;

    @IsNotEmpty({ message: 'Không được để trống' })
    @IsNumber({}, { message: 'Giá phải là một số' }) 
    price: number;

    @IsNotEmpty({ message: 'Không được để trống' })
    @IsNumber({}, { message: 'Số lượng phải là một số' })
    quantity: number;
    
    @IsNotEmpty({ message: 'Không được để trống' })
    @IsString()
    description: string;

    @IsString()
    @IsOptional()
    imageUrl?: string;
}
export class updateDto extends CommonDto{
    @IsNotEmpty({ message: 'Không được để trống' })
    @IsString({ message: 'Tên sản phẩm phải là một chuỗi' })
    name: string;

    @IsNotEmpty({ message: 'Không được để trống' })
    @IsNumber({}, { message: 'Giá phải là một số' })
    price: number;

    @IsNotEmpty({ message: 'Không được để trống' })
    @IsNumber({}, { message: 'Số lượng phải là một số' })
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
