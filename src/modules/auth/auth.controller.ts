import { Body, Controller, Post,HttpException } from "@nestjs/common";
import { BaseController } from "../../common/base/base.controller";
import { AuthService } from "./auth.service";
import { TrimBodyPipe } from "../../common/helper/pipe/trim.body.pipe";
import { LoginDto } from "./auth.interface";
import { ErrorResponse, SuccessResponse } from "../../common/helper/response";
import { HttpStatus } from "../../common/constants";


@Controller('auth')
export class AuthController extends BaseController{
    constructor(private readonly authService: AuthService) {
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
            if(result)
                return new SuccessResponse(result);
                throw new HttpException(
                    'Tài khoản mật khẩu không chính xác',
                    HttpStatus.UNAUTHORIZED,
                  );
        } catch (error) {
            this.handleError(error);
        }
    }
    @Post('refresh')
    async refresh(@Body() body:any)
    {
        // console.log(body)
        return this.authService.refreshToken(body.refresh_token)
    }
}