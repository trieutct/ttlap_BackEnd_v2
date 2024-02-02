import { BaseService } from "src/common/base/base.service";
import { User } from "src/database/schemas/user.schema";
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
            const product: SchemaCreateDocument<User> = {
                ...(dto as any),
            };
            const res= await this.userRepository.createOne(product)
            return res;
        } catch (error) {
            this.logger.error('Error in productService createproduct: ' + error);
            throw error;
        }
    }
    async findProductById(
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
    async deleteProduct(id: Types.ObjectId) {
        try {
            await this.userRepository.softDeleteOne({ _id: id });
            return { id };
        } catch (error) {
            this.logger.error('Error in ProductService deleteProduct: ' + error);
            throw error;
        }
    }
    async findAllAndCountUserByQuery(query: GetUserListQuery) {
        try {
            const result =await this.userRepository.findAllAndCountUserByQuery(query);
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
            return await this.findProductById(id);
        } catch (error) {
            this.logger.error('Error in ProductService updateProduct: ' + error);
            throw error;
        }
    }
}