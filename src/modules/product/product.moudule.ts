import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Product, ProductSchema } from "../../database/schemas/product.schema";
import { ProductController } from "./controller/product.controller";
import { ProductService } from "./service/product.service";
import { ProductRepository } from "./repository/product.repository";
import { CloudinaryService } from "../../common/cloudinary/cloudinary.service";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user/service/user.service";
import { UserRepository } from "../user/repositoy/user.repository";
import { User, UserSchema } from "src/database/schemas/user.schema";
@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Product.name, schema: ProductSchema },
        ]),
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
        ]),
    ],
    controllers: [ProductController],
    providers: [ProductService, ProductRepository,CloudinaryService,JwtService,UserService,UserRepository],
    exports: [ProductRepository],
})
export class ProductModule {}