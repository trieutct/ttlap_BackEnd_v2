import {
  Body,
  Controller,
  Post,
  HttpException,
  Get,
  Param,
} from '@nestjs/common';
import { BaseController } from '../../common/base/base.controller';
import { AuthService } from './auth.service';
import { TrimBodyPipe } from '../../common/helper/pipe/trim.body.pipe';
import { LoginDto, RegisterDto } from './auth.interface';
import { ErrorResponse, SuccessResponse } from '../../common/helper/response';
import {
  ContentRegister,
  HttpStatus,
  jwtConstantsRegister,
} from '../../common/constants';
import { BcryptService } from '../../common/helper/bcrypt';
import { MailService } from '../../mail/mail.service';
import { config } from 'dotenv';
config();

@Controller('auth')
export class AuthController extends BaseController {
  constructor(
    private readonly authService: AuthService,
    private readonly brypt: BcryptService,
    private readonly mailService: MailService,
  ) {
    super();
  }
  @Post('login')
  async loginUser(
    @Body(new TrimBodyPipe())
    dto: LoginDto,
  ) {
    // console.log(dto)
    try {
      const result = await this.authService.Login(dto);
      if (result) return new SuccessResponse(result);
      throw new HttpException(
        'Tài khoản mật khẩu không chính xác',
        HttpStatus.UNAUTHORIZED,
      );
    } catch (error) {
      this.handleError(error);
    }
  }
  @Post('refresh')
  async refresh(@Body() body: any) {
    // console.log(body)
    return this.authService.refreshToken(body.refresh_token);
  }
  @Post('register')
  async register(@Body(new TrimBodyPipe()) dto: RegisterDto) {
    try {
      const res = await this.authService.checkEmaiL(dto.email);
      if (res) throw new HttpException('Email đã tồn tại', HttpStatus.CONFLICT);
      const token = await this.authService.generateToken(
        dto,
        jwtConstantsRegister.secret,
        jwtConstantsRegister.expiresIn,
      );
      await this.mailService.sendMail(dto.email,ContentRegister.subject,ContentRegister.text+`${process.env.LINK_FONT_END}/${token}`)
      return new SuccessResponse("Check Email");
    } catch (error) {
      this.handleError(error);
    }
  }
  @Get('vertify/:token')
  async Vertify(@Param('token') token: string) {
    try {
      const { data } = await this.authService.verifyToken(token);
      const check = await this.authService.checkEmaiL(data.email);
      if (check) throw new HttpException('Email đã tồn tại', HttpStatus.CONFLICT);
      data.password=await this.brypt.hashPassword(data.password)
      const res= await this.authService.createUser(data)
      return new SuccessResponse(res)
      // return new SuccessResponse("ok")
    } catch (error) {
      this.handleError(error);
    }
  }
  @Get('sendEmail')
  async test() {
    this.mailService.sendMail(
      'ducvnhhh0907@gmail.com',
      'Xác nhận tài khoản',
      'Vui lòng xác nhận',
    );
  }
}
