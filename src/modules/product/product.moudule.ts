import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Product, ProductSchema } from "../../database/schemas/product.schema";
import { ProductController } from "./controller/product.controller";
import { ProductService } from "./service/product.service";
import { ProductRepository } from "./repository/product.repository";
import { CloudinaryService } from "../../common/cloudinary/cloudinary.service";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Product.name, schema: ProductSchema },
        ]),
    ],
    controllers: [ProductController],
    providers: [ProductService, ProductRepository,CloudinaryService],
    exports: [ProductRepository],
})
export class ProductModule {}