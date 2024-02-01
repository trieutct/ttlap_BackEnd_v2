import { BaseController } from "src/common/base/base.controller";
import { ProductService } from '../service/product.service';
import { Controller, Get } from "@nestjs/common";

@Controller('product')
export class ProductController extends BaseController{
    constructor(
        private readonly productService: ProductService,
    ) {
        super();
    }
    @Get()
    async getall()
    {
        return "ok"
    }
}