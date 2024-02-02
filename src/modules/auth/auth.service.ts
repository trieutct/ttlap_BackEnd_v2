import { Injectable } from "@nestjs/common";
import { BaseService } from "src/common/base/base.service";
import { User } from "src/database/schemas/user.schema";
import { AuthRepository } from "./auth.repository";
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from "./auth.interface";
import { jwtConstants } from "src/common/constants";

@Injectable()
export class AuthService extends BaseService<User,AuthRepository>
{
    constructor(
        private readonly authRepository: AuthRepository,
        private jwtService: JwtService,
    ) {
        super(authRepository);
    }
    async Login(dto:LoginDto)
    {
        const data=await this.authRepository.findOne(dto);
        if(!data)
            return null
            const access_token = await this.jwtService.signAsync(
                { data },
                {
                    secret: jwtConstants.secret,
                    expiresIn: jwtConstants.expiresIn,
                },
            );
            const refresh_token = await this.jwtService.signAsync(
                { data },
                {
                    secret: jwtConstants.secret,
                    expiresIn: jwtConstants.refresh_expiresIn,
                },
            );
            return {
                accessToken: {
                    token:access_token,
                    expiresIn: jwtConstants.expiresIn,
                },
                refreshToken:{
                    token: refresh_token,
                    expiresIn: jwtConstants.refresh_expiresIn,
                },
                profile:{
                    email:data.email,
                    _id:data.id
                }
            };
    }
}