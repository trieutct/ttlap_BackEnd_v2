import { BaseController } from "../../../common/base/base.controller";
import { ProductService } from '../service/product.service';
import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { TrimBodyPipe } from "../../../common/helper/pipe/trim.body.pipe";
import { GetProductListQuery, createDto, updateDto } from "../dto/product.interface";
import { CloudinaryService } from "../../../common/cloudinary/cloudinary.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { SuccessResponse } from "../../../common/helper/response";
import mongoose from "mongoose";
import { toObjectId } from "../../../common/helper/commonFunction";

@Controller('product')
export class ProductController extends BaseController{
    constructor(
        private readonly productService: ProductService,private readonly cloudinaryService:CloudinaryService
    ) {
        super();
    }
    @Get()
    async getall(@Query()query :GetProductListQuery)
    {
        return await this.productService.findAllAndCountProductByQuery(query);
    }
    @UseInterceptors(FileInterceptor('file'))
    @Post()
    async create(@Body(new TrimBodyPipe()) dto: createDto,@UploadedFile() file,)
    {
        try{
            if (file != null) {
                const url = await this.cloudinaryService.uploadImage(file);
                dto.imageUrl = url;
            }
            const result=await this.productService.createProduct(dto)
            return new SuccessResponse(result)
        }catch (error) {
            this.handleError(error);
            // Có thể thêm hành động khác tùy thuộc vào yêu cầu của bạn, ví dụ trả về response lỗi cụ thể.
        }
    }
    @UseInterceptors(FileInterceptor('file'))
    @Put(':id')
    async updateProduct(@Param('id')id:string,
    @Body(new TrimBodyPipe())
    dto:updateDto,
    @UploadedFile() file)
    {
        try
        {
            const isValid=mongoose.Types.ObjectId.isValid(id)
            if(!isValid)
            {
                throw new HttpException("Id không giống định dạng",HttpStatus.BAD_REQUEST);
            }
            const product=await this.productService.findProductById(toObjectId(id));
            if(file)
            {
                const url = await this.cloudinaryService.uploadImage(file);
                dto.imageUrl = url;
            }
            else
            {
                dto.imageUrl=product.imageUrl
            }
            const result=await this.productService.updateProduct(toObjectId(id),dto);
            if(result)
                return new SuccessResponse(result)
            throw new HttpException("Cập nhật thất bại",HttpStatus.INTERNAL_SERVER_ERROR);
        }
        catch(error)
        {
            this.handleError(error);
        }
    }
    @Get(':id')
    async getProductById(@Param('id')id:string,)
    {
        try{
            const isValid=mongoose.Types.ObjectId.isValid(id)
            if(!isValid)
            {
                throw new HttpException("Id không giống định dạng",HttpStatus.BAD_REQUEST);
            }
            const result = await this.productService.findProductById(toObjectId(id));
            if(result)
                return new SuccessResponse(result);
            throw new HttpException("Không tìm thấy product",HttpStatus.NOT_FOUND);
        }catch(error)
        {
            this.handleError(error);
        }
    }
    @Delete(':id')
    async deleteProduct(@Param('id')id:string,)
    {
        const isValid=mongoose.Types.ObjectId.isValid(id)
        if(!isValid)
        {
            throw new HttpException("Id không giống định dạng",HttpStatus.BAD_REQUEST);
        }
        const result=await this.productService.deleteProduct(toObjectId(id))
        if(result)
            return new SuccessResponse(result);
        throw new HttpException("Không tìm thấy product",HttpStatus.NOT_FOUND);
    }
}