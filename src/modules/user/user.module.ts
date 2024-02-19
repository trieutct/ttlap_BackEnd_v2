import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "../../database/schemas/user.schema";
import { UserController } from "./controller/user.controller";
import { UserService } from "./service/user.service";
import { UserRepository } from "./repositoy/user.repository";
import { CloudinaryService } from "../../common/cloudinary/cloudinary.service";
import { JwtService } from "@nestjs/jwt";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
        ]),
    ],
    controllers: [UserController],
    providers: [UserService, UserRepository,CloudinaryService,JwtService],
    exports: [UserRepository],
})
export class UserModule {}