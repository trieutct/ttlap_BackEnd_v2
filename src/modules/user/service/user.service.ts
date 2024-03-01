import { BaseService } from "../../../common/base/base.service";
import { User } from "../../../database/schemas/user.schema";
import { UserRepository } from "../repositoy/user.repository";
import { Injectable } from "@nestjs/common";
import { GetUserListQuery, createUserDto,UpdateUserDto } from "../dto/user.interface";
import { Types } from "mongoose";
import { UserAttributesForList } from "../user.constant";



@Injectable()
export class UserService extends BaseService<User,UserRepository>
{
    constructor(private readonly userRepository: UserRepository) {
        super(userRepository);
    }
    async createUser(dto: createUserDto) {
        try {
            // console.log({...(dto as any)})
            const user: SchemaCreateDocument<User> = {
                ...(dto as any),
            };
            const res= await this.userRepository.createOne(user)
            return res;
        } catch (error) {
            this.logger.error('Error in userService createuser: ' + error);
            throw error;
        }
    }
    async findUserById(
        id: Types.ObjectId,
        attributes: (keyof User)[] = UserAttributesForList,
    ) {
        try {
            return await this.userRepository.getOneById(id, attributes);
        } catch (error) {
            this.logger.error('Error in ProductService findProductById: ' + error);
            throw error;
        }
    }
    async deleteProduct(id: Types.ObjectId,idUser:string) {
        try {
            await this.userRepository.softDeleteOne({ _id: id });
            return { id };
        } catch (error) {
            this.logger.error('Error in ProductService deleteProduct: ' + error);
            throw error;
        }
    }
    async findAllAndCountUserByQuery(query: GetUserListQuery,id:string) {
        try {
            const result =await this.userRepository.findAllAndCountUserByQuery(query,id);
            return result;
        } catch (error) {
            this.logger.error(
                'Error in UserService findAllAndCountProductByQuery: ' + error,
            );
            throw error;
        }
    }
    async updateUser(id: Types.ObjectId, dto: UpdateUserDto) {
        try {
            await this.userRepository.updateOneById(id, dto);
            return await this.findUserById(id);
        } catch (error) {
            this.logger.error('Error in ProductService updateProduct: ' + error);
            throw error;
        }
    }
    async findUserByEmail(email:string)
    {
        try{
            return await this.userRepository.findOne({
                email:email
            })
        }catch (error) {
            this.logger.error('Error in UserService updateUser: ' + error);
            throw error;
        }
    }
}