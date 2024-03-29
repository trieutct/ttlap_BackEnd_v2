import { BaseController } from "../../../common/base/base.controller";
import { UserService } from '../service/user.service';
import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Patch, Query, UploadedFile, UseInterceptors, UsePipes, ValidationPipe,UseGuards } from "@nestjs/common";
import { TrimBodyPipe } from "../../../common/helper/pipe/trim.body.pipe";
import { GetUserListQuery, createUserDto, UpdateUserDto } from "../dto/user.interface";
import { CloudinaryService } from "../../../common/cloudinary/cloudinary.service";
import { SuccessResponse } from "../../../common/helper/response";
import mongoose from "mongoose";
import { toObjectId } from "../../../common/helper/commonFunction";
import { LoggedInUser } from "../../../modules/decorator/loggedInUser.decorator";
import { Role } from "../../../modules/decorator/roles.decorator";
import { RoleCollection } from "../../../common/constants";
import { AuthGuard } from "../../../modules/auth/auth.guard";
import { RolesGuard } from "../../../modules/auth/role.guard";
import { BcryptService } from "../../../common/helper/bcrypt";

@Controller('user')
export class UserController extends BaseController{
    constructor(
        private readonly UserService: UserService,private readonly cloudinaryService:CloudinaryService,private readonly brypt:BcryptService
    ) {
        super();
    }
    @UseGuards(AuthGuard)
    @Get()
    async getall(@Query()query :GetUserListQuery,@LoggedInUser() user)
    {
        return await this.UserService.findAllAndCountUserByQuery(query,user.data.id);
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
            if(await this.UserService.findUserByEmail(dto.email))
            {
                throw new HttpException("Email đã tồn tại",HttpStatus.BAD_REQUEST);
            }
            dto.createdBy=loggedInUser.data.id
            dto.password=await this.brypt.hashPassword("t12345678")
            const result=await this.UserService.createUser(dto)
            return new SuccessResponse(result)
        }catch (error) {
            this.handleError(error);
        }
    }
    // @UseInterceptors(FileInterceptor('file'))
    @Role(RoleCollection.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    @Patch(':id')
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
            if(user.email!==dto.email)
            {
                if(await this.UserService.findUserByEmail(dto.email))
                {
                    throw new HttpException("Email đã tồn tại",HttpStatus.BAD_REQUEST);
                }
            }
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
    @Role(RoleCollection.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    @Get(':id')
    async getUserById(@Param('id')id:string)
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
            throw new HttpException("Không tìm thấy User",HttpStatus.NOT_FOUND);
        }catch(error)
        {
            this.handleError(error);
        }
    }
    @Role(RoleCollection.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    @Delete(':id')
    async deleteProduct(@Param('id')id:string,@LoggedInUser() loggedInUser)
    {
        const isValid=mongoose.Types.ObjectId.isValid(id)
        if(!isValid)
        {
            throw new HttpException("Id không giống định dạng",HttpStatus.BAD_REQUEST);
        }
        const result=await this.UserService.deleteProduct(toObjectId(id),loggedInUser.data.id)
        if(result)
            return new SuccessResponse(result);
        throw new HttpException("Không tìm thấy User",HttpStatus.NOT_FOUND);
    }
}