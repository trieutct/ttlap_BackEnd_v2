import { IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";
import { ProductOrderBy } from "../product.constants";
import { CommonDto, CommonListQuery } from "../../../common/interfaces";
import { MAX_PRICE, MAX_QUANTITY, MIN_PRICE, MIN_QUANTITY } from "src/common/constants";

export class createDto extends CommonDto{
    @IsNotEmpty({ message: 'Không được để trống' })
    @IsString({ message: 'Tên sản phẩm phải là một chuỗi' })
    name: string;

    @IsNotEmpty({ message: 'Không được để trống' })
    // @IsNumber({},{message:"Price phải là số"})
    // @Min(MIN_PRICE,{message:'Price phải lớn hơn '+MIN_PRICE})
    // @Max(MAX_PRICE,{message:'Price phải nhỏ hơn '+MAX_PRICE})
    price: number;

    @IsNotEmpty({ message: 'Không được để trống' })
    // @IsNumber({},{message:"Quantity phải là số"})
    // @Min(MIN_QUANTITY,{message:'Quantity phải lớn hơn '+MIN_QUANTITY})
    // @Max(MAX_QUANTITY,{message:'Quantity phải nhỏ hơn '+MAX_QUANTITY})
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
