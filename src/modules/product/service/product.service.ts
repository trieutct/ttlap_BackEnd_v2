import { BaseService } from "src/common/base/base.service";
import { Product } from "src/database/schemas/product.schema";
import { ProductRepository } from "../repository/product.repository";
import { Injectable } from "@nestjs/common";
import { GetProductListQuery, createDto, updateDto } from "../dto/product.interface";
import { Types } from "mongoose";
import { ProductAttributesForList } from "../product.constants";



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
            return res;
        } catch (error) {
            this.logger.error('Error in productService createproduct: ' + error);
            throw error;
        }
    }
    async findProductById(
        id: Types.ObjectId,
        attributes: (keyof Product)[] = ProductAttributesForList,
    ) {
        try {
            return await this.productRepository.getOneById(id, attributes);
        } catch (error) {
            this.logger.error('Error in ProductService findProductById: ' + error);
            throw error;
        }
    }
    async deleteProduct(id: Types.ObjectId) {
        try {
            await this.productRepository.softDeleteOne({ _id: id });
            return { id };
        } catch (error) {
            this.logger.error('Error in ProductService deleteProduct: ' + error);
            throw error;
        }
    }
    async findAllAndCountProductByQuery(query: GetProductListQuery) {
        try {
            const result =await this.productRepository.findAllAndCountProductByQuery(query);
            return result;
        } catch (error) {
            this.logger.error(
                'Error in ProductService findAllAndCountProductByQuery: ' + error,
            );
            throw error;
        }
    }
    async updateProduct(id: Types.ObjectId, dto: updateDto) {
        try {
            await this.productRepository.updateOneById(id, dto);
            return await this.findProductById(id);
        } catch (error) {
            this.logger.error('Error in ProductService updateProduct: ' + error);
            throw error;
        }
    }
}