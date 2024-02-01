import { BaseService } from "src/common/base/base.service";
import { Product } from "src/database/schemas/product.schema";
import { ProductRepository } from "../repository/product.repository";
import { Injectable } from "@nestjs/common";
import { createDto } from "../dto/product.interface";



@Injectable()
export class ProductService extends BaseService<Product,ProductRepository>
{
    constructor(private readonly productRepository: ProductRepository) {
        super(productRepository);
    }
    async createProduct(dto: createDto) {
        try {
            // console.log({...(dto as any)})
            const product: SchemaCreateDocument<Product> = {
                ...(dto as any),
            };
            const res= await this.productRepository.createOne(product)
            // console.log(res)
            return res;
        } catch (error) {
            this.logger.error('Error in productService createproduct: ' + error);
            throw error;
        }
    }
}