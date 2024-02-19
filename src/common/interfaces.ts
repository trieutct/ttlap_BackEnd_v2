import { IsOptional, IsString } from "class-validator";
import { OrderDirection } from "./constants";
import { Types } from "mongoose";

export class CommonListQuery {
    page?: number;

    limit?: number;

    orderBy?: string;

    orderDirection?: OrderDirection;

    keyword?: string;
}
export class CommonDto{
    @IsOptional()
    @IsString({ message: 'Tên sản phẩm phải là một chuỗi' })
    id?: string;
    @IsOptional()
    createdAt?: Date;
    @IsOptional()
    updatedAt?: Date;
    @IsOptional()
    deletedAt?: Date;
    @IsOptional()
    deletedBy?: Types.ObjectId;
    @IsOptional()
    updatedBy?: Types.ObjectId;
    @IsOptional()
    createdBy?: Types.ObjectId;
}