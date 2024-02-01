import { Injectable } from "@nestjs/common"
import { BaseRepository } from "src/common/base/base.repository"
import { Product } from "src/database/schemas/product.schema"
import { InjectModel } from '@nestjs/mongoose';
import { ProductDocument } from "src/database/schemas/product.schema";
import { FilterQuery, Model } from 'mongoose';
import { GetProductListQuery } from "../dto/product.interface";
import { DEFAULT_FIRST_PAGE, DEFAULT_LIMIT_FOR_PAGINATION, DEFAULT_ORDER_BY, DEFAULT_ORDER_DIRECTION,OrderDirection,softDeleteCondition } from "src/common/constants";
import { parseMongoProjection } from "src/common/helper/commonFunction";
import { ProductAttributesForList } from "../product.constants";


@Injectable()
export class ProductRepository extends BaseRepository<Product>{
    constructor(
        @InjectModel(Product.name)
        private readonly productModel: Model<ProductDocument>,
    ) {
        super(productModel);
    }


    async findAllAndCountProductByQuery(query: GetProductListQuery) {
        try {
            const {
                keyword = '',
                page = +DEFAULT_FIRST_PAGE,
                limit = +DEFAULT_LIMIT_FOR_PAGINATION,
                orderBy = DEFAULT_ORDER_BY,
                orderDirection = DEFAULT_ORDER_DIRECTION,
                // name = '',
            } = query;
            const matchQuery: FilterQuery<Product> = {};
            matchQuery.$and = [
                {
                    ...softDeleteCondition,
                },
            ];

            if (keyword) {
                matchQuery.$and.push({
                    name: { $regex: `.*${keyword}.*`, $options: 'i' },
                });
            }

            // if (name) {
            //     matchQuery.$and.push({
            //         name,
            //     });
            // }

            const [result] = await this.productModel.aggregate([
                {
                    $addFields: {
                        id: { $toString: '$_id' },
                    },
                },
                {
                    $match: {
                        ...matchQuery,
                    },
                },
                {
                    $project: parseMongoProjection(ProductAttributesForList),
                },
                {
                    $facet: {
                        count: [{ $count: 'total' }],
                        data: [
                            {
                                $sort: {
                                    [orderBy]:
                                        orderDirection === OrderDirection.ASC
                                            ? 1
                                            : -1,
                                    ['_id']:
                                        orderDirection === OrderDirection.ASC
                                            ? 1
                                            : -1,
                                },
                            },
                            {
                                $skip: (page - 1) * limit,
                            },
                            {
                                $limit: Number(limit),
                            },
                        ],
                    },
                },
            ]);
            return {
                totalItems: result?.count?.[0]?.total || 0,
                items: result?.data || [],
            };
        } catch (error) {
            this.logger.error(
                'Error in ProductRepository findAllAndCountProductByQuery: ' + error,
            );
            throw error;
        }
    }
}