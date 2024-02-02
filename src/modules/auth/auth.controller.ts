import { Body, Controller, Post } from "@nestjs/common";
import { BaseController } from "src/common/base/base.controller";
import { AuthService } from "./auth.service";
import { TrimBodyPipe } from "src/common/helper/pipe/trim.body.pipe";
import { LoginDto } from "./auth.interface";
import { SuccessResponse } from "src/common/helper/response";


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
            
            return new SuccessResponse(result);
        } catch (error) {
            this.handleError(error);
        }
    }
}