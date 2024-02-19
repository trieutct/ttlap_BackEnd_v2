import { BaseController } from "../../../common/base/base.controller";
import { UserService } from '../service/user.service';
import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query, UploadedFile, UseInterceptors, UsePipes, ValidationPipe,UseGuards } from "@nestjs/common";
import { TrimBodyPipe } from "../../../common/helper/pipe/trim.body.pipe";
import { GetUserListQuery, createUserDto, UpdateUserDto } from "../dto/user.interface";
import { CloudinaryService } from "../../../common/cloudinary/cloudinary.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { SuccessResponse } from "../../../common/helper/response";
import mongoose from "mongoose";
import { toObjectId } from "../../../common/helper/commonFunction";
import { LoggedInUser } from "src/modules/decorator/loggedInUser.decorator";
import { Role } from "src/modules/decorator/roles.decorator";
import { RoleCollection } from "src/common/constants";
import { AuthGuard } from "src/modules/auth/auth.guard";
import { RolesGuard } from "src/modules/auth/role.guard";

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
    // @UseInterceptors(FileInterceptor('file'))
    @Role(RoleCollection.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    @Post()
    async create(@Body(new TrimBodyPipe()) dto: createUserDto,@LoggedInUser() loggedInUser
    // @UploadedFile() file,
    )
    {
        // console.log(dto)
        try{
            // if (file != null) {
            //     const url = await this.cloudinaryService.uploadImage(file);
            //     dto.avatar = url;
            // }
            dto.createdBy=loggedInUser.data.id
            dto.password="t12345678"
            const result=await this.UserService.createUser(dto)
            return new SuccessResponse(result)
        }catch (error) {
            this.handleError(error);
        }
    }
    // @UseInterceptors(FileInterceptor('file'))
    @Role(RoleCollection.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    @Put(':id')
    async update(@Param('id')id:string,
    @Body(new TrimBodyPipe())
    dto:UpdateUserDto,
    // @UploadedFile() file,
    @LoggedInUser() loggedInUser)
    {
        try
        {
            const isValid=mongoose.Types.ObjectId.isValid(id)
            if(!isValid)
            {
                throw new HttpException("Id không giống định dạng",HttpStatus.BAD_REQUEST);
            }
            const user=await this.UserService.findUserById(toObjectId(id));
            // if(file)
            // {
            //     const url = await this.cloudinaryService.uploadImage(file);
            //     dto.avatar = url;
            // }
            // else
            // {
            //     dto.avatar=product.avatar
            // }
            if(!user)
                throw new HttpException("User không tồn tại",HttpStatus.BAD_REQUEST);
            dto.updatedBy=loggedInUser.data.id
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
            const result = await this.UserService.findUserById(toObjectId(id));
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