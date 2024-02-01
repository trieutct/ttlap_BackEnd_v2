import { Injectable } from "@nestjs/common"
import { BaseRepository } from "src/common/base/base.repository"
import { Product } from "src/database/schemas/product.schema"
import { InjectModel } from '@nestjs/mongoose';
import { ProductDocument } from "src/database/schemas/product.schema";
import { FilterQuery, Model } from 'mongoose';


@Injectable()
export class ProductRepository extends BaseRepository<Product>{
    constructor(
        @InjectModel(Product.name)
        private readonly productModel: Model<ProductDocument>,
    ) {
        super(productModel);
    }
}