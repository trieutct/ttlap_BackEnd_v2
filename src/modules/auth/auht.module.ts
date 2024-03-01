import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "../../database/schemas/user.schema";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AuthRepository } from "./auth.repository";
import { JwtService } from "@nestjs/jwt";
import { BcryptService } from "../../common/helper/bcrypt";
import { MailService } from "../../mail/mail.service";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
        ]),
    ],
    controllers: [AuthController],
    providers: [AuthService, AuthRepository,JwtService,BcryptService,MailService],
    exports: [AuthRepository],
})
export class AuthModule {}