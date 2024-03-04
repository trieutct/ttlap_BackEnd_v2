import { BaseController } from '../../../common/base/base.controller';
import { ProductService } from '../service/product.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Patch
} from '@nestjs/common';
import { TrimBodyPipe } from '../../../common/helper/pipe/trim.body.pipe';
import {
  GetProductListQuery,
  createDto,
  updateDto,
} from '../dto/product.interface';
import { CloudinaryService } from '../../../common/cloudinary/cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { SuccessResponse } from '../../../common/helper/response';
import mongoose from 'mongoose';
import { toObjectId } from '../../../common/helper/commonFunction';
import { AuthGuard } from '../../../modules/auth/auth.guard';
import { Role } from '../../../modules/decorator/roles.decorator';
import { RoleCollection } from '../../../common/constants';
import { RolesGuard } from '../../../modules/auth/role.guard';
import { LoggedInUser } from '../../../modules/decorator/loggedInUser.decorator';
@Controller('product')
export class ProductController extends BaseController {
  constructor(
    private readonly productService: ProductService,
    private readonly cloudinaryService: CloudinaryService,
  ) {
    super();
  }
  // @Role(RoleCollection.Admin)
  @UseGuards(AuthGuard)
  @Get()
  async getall(@Query() query: GetProductListQuery) {
    return await this.productService.findAllAndCountProductByQuery(query);
  }
  @Role(RoleCollection.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @UseInterceptors(FileInterceptor('file'))
  @Post()
  async create(@Body(new TrimBodyPipe()) dto: createDto, @UploadedFile() file,@LoggedInUser() loggedInUser) {
    try {
      
      if (file == null) {
          throw new HttpException('Vui lòng chọn ảnh', HttpStatus.BAD_REQUEST);
        }
        const url = await this.cloudinaryService.uploadImage(file);
        dto.imageUrl = url;
      if(await this.productService.finProductByName(dto.name))
      {
        throw new HttpException('Tên sản phẩm đã tồn tại',HttpStatus.BAD_REQUEST);
      }
      dto.createdBy=loggedInUser.data.id
      // dto.imageUrl = 'https://scontent.fhph2-1.fna.fbcdn.net/v/t39.30808-6/405270929_3734295376897775_6745873818454262834_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=CLsOBI1M5EUAX9PY3S-&_nc_ht=scontent.fhph2-1.fna&oh=00_AfAQgNdidp1LDzG3SNLxcGRH7O-Lyoz5ItY6g_rfdse-mQ&oe=65D3849D';
      const result = await this.productService.createProduct(dto);
      return new SuccessResponse(result);
    } catch (error) {
      this.handleError(error);
    }
  }
  @Role(RoleCollection.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @UseInterceptors(FileInterceptor('file'))
  @Patch(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body(new TrimBodyPipe())
    dto: updateDto,
    @LoggedInUser() loggedInUser,
    @UploadedFile() file?,
  ) {
    try {
      const isValid = mongoose.Types.ObjectId.isValid(id);
      if (!isValid) {
        throw new HttpException(
          'Id không giống định dạng',
          HttpStatus.BAD_REQUEST,
        );
      }
      const product = await this.productService.findProductById(toObjectId(id));
      if(!product)
        throw new HttpException('Sản phẩm không tồn tại',HttpStatus.NOT_FOUND);
      if(product.name!==dto.name)
      {
        if(await this.productService.finProductByName(dto.name))
          throw new HttpException('Sản phẩm đã tồn tại',HttpStatus.BAD_REQUEST);
      }
      if (file) {
        const url = await this.cloudinaryService.uploadImage(file);
        dto.imageUrl = url;
        // dto.imageUrl ='https://scontent.fhph2-1.fna.fbcdn.net/v/t39.30808-6/405270929_3734295376897775_6745873818454262834_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=CLsOBI1M5EUAX9PY3S-&_nc_ht=scontent.fhph2-1.fna&oh=00_AfAQgNdidp1LDzG3SNLxcGRH7O-Lyoz5ItY6g_rfdse-mQ&oe=65D3849D';
      } else {
        dto.imageUrl = product.imageUrl;
      }
      dto.updatedBy=loggedInUser.data.id
      const result = await this.productService.updateProduct(
        toObjectId(id),
        dto,
      );
      if (result) return new SuccessResponse(result);
      throw new HttpException(
        'Cập nhật thất bại',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } catch (error) {
      this.handleError(error);
    }
  }
  @Role(RoleCollection.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Get(':id')
  async getProductById(@Param('id') id: string) {
    try {
      const isValid = mongoose.Types.ObjectId.isValid(id);
      if (!isValid) {
        throw new HttpException(
          'Id không giống định dạng',
          HttpStatus.BAD_REQUEST,
        );
      }
      const result = await this.productService.findProductById(toObjectId(id));
      if (result) return new SuccessResponse(result);
        throw new HttpException('Không tìm thấy product', HttpStatus.NOT_FOUND);
    } catch (error) {
      this.handleError(error);
    }
  }
  @Role(RoleCollection.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':id')
  async deleteProduct(@Param('id') id: string,@LoggedInUser() loggedInUser) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) {
      throw new HttpException(
        'Id không giống định dạng',
        HttpStatus.BAD_REQUEST,
      );
    }
    const result = await this.productService.deleteProduct(toObjectId(id),loggedInUser.data.id);
    if (result) return new SuccessResponse(result);
    throw new HttpException('Không tìm thấy product', HttpStatus.NOT_FOUND);
  }
}
