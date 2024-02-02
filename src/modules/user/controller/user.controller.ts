import { BaseController } from "src/common/base/base.controller";
import { UserService } from '../service/user.service';
import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { TrimBodyPipe } from "src/common/helper/pipe/trim.body.pipe";
import { GetUserListQuery, createUserDto, UpdateUserDto } from "../dto/user.interface";
import { CloudinaryService } from "src/common/cloudinary/cloudinary.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { SuccessResponse } from "src/common/helper/response";
import mongoose from "mongoose";
import { toObjectId } from "src/common/helper/commonFunction";

@Controller('user')
export class UserController extends BaseController{
    constructor(
        private readonly UserService: UserService,private readonly cloudinaryService:CloudinaryService
    ) {
        super();
    }
    @Get()
    async getall(@Query()query :GetUserListQuery)
    {
        return await this.UserService.findAllAndCountUserByQuery(query);
    }
    @UseInterceptors(FileInterceptor('file'))
    @Post()
    async create(@Body(new TrimBodyPipe()) dto: createUserDto,@UploadedFile() file,)
    {
        try{
            if (file != null) {
                const url = await this.cloudinaryService.uploadImage(file);
                dto.avatar = url;
            }
            const result=await this.UserService.createUser(dto)
            return new SuccessResponse(result)
        }catch (error) {
            this.handleError(error);
            // Có thể thêm hành động khác tùy thuộc vào yêu cầu của bạn, ví dụ trả về response lỗi cụ thể.
        }
    }
    @UseInterceptors(FileInterceptor('file'))
    @Put(':id')
    async update(@Param('id')id:string,
    @Body(new TrimBodyPipe())
    dto:UpdateUserDto,
    @UploadedFile() file)
    {
        try
        {
            const isValid=mongoose.Types.ObjectId.isValid(id)
            if(!isValid)
            {
                throw new HttpException("Id không giống định dạng",HttpStatus.BAD_REQUEST);
            }
            const product=await this.UserService.findProductById(toObjectId(id));
            if(file)
            {
                const url = await this.cloudinaryService.uploadImage(file);
                dto.avatar = url;
            }
            else
            {
                dto.avatar=product.avatar
            }
            const result=await this.UserService.updateUser(toObjectId(id),dto);
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
    async getUserById(@Param('id')id:string,)
    {
        try{
            const isValid=mongoose.Types.ObjectId.isValid(id)
            if(!isValid)
            {
                throw new HttpException("Id không giống định dạng",HttpStatus.BAD_REQUEST);
            }
            const result = await this.UserService.findProductById(toObjectId(id));
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
        const result=await this.UserService.deleteProduct(toObjectId(id))
        if(result)
            return new SuccessResponse(result);
        throw new HttpException("Không tìm thấy product",HttpStatus.NOT_FOUND);
    }
}