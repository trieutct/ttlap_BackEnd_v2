import { Injectable, UnauthorizedException,HttpException } from '@nestjs/common';
import { BaseService } from '../../common/base/base.service';
import { User } from '../../database/schemas/user.schema';
import { AuthRepository } from './auth.repository';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './auth.interface';
import { jwtConstants } from '../../common/constants';
import { BcryptService } from '../../common/helper/bcrypt';
import { createUserDto } from '../user/dto/user.interface';

@Injectable()
export class AuthService extends BaseService<User, AuthRepository> {
  constructor(
    private readonly authRepository: AuthRepository,
    private jwtService: JwtService,
    private readonly brypt: BcryptService,
  ) {
    super(authRepository);
  }
  async Login(dto: LoginDto) {
    try {
      const data = await this.authRepository.findOne({ email: dto.email });
      // console.log(data)
      if (!data) return null;

      if (!(await this.brypt.comparePassword(dto.password, data.password)))
        return null;
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
          token: access_token,
          expiresIn: jwtConstants.expiresIn,
        },
        refreshToken: {
          token: refresh_token,
          expiresIn: jwtConstants.refresh_expiresIn,
        },
        profile: {
          email: data.email,
          _id: data.id,
          role: data.role,
          avatar: data.avatar,
        },
      };
    } catch (error) {
      this.logger.error('Error in autherService login: ' + error);
      throw error;
    }
  }

  async refreshToken(refresh_token) {
    try {
      const { data } = await this.jwtService.verify(refresh_token, {
        secret: jwtConstants.secret,
      });
      const access_token_new = await this.jwtService.signAsync(
        { data },
        {
          secret: jwtConstants.secret,
          expiresIn: jwtConstants.expiresIn,
        },
      );
      const refresh_token_new = await this.jwtService.signAsync(
        { data },
        {
          secret: jwtConstants.secret,
          expiresIn: jwtConstants.refresh_expiresIn,
        },
      );
      return {
        accessToken: {
          token: access_token_new,
          expiresIn: jwtConstants.expiresIn,
        },
        refreshToken: {
          token: refresh_token_new,
          expiresIn: jwtConstants.refresh_expiresIn,
        },
      };
    } catch (e) {
      throw new UnauthorizedException(
        'Hết phiên đăng nhập. vui lòng đăng nhập lại',
      );
    }
  }

  async generateToken(data: any, secret: string, expiresIn: number) {
    try {
      const token = await this.jwtService.signAsync(
        { data },
        {
          secret: secret,
          expiresIn: expiresIn,
        },
      );
      return token;
    } catch (e) {
      console.log('Error generateToken authService');
    }
  }

  async verifyToken(token: string) {
    try {
      return await this.jwtService.verify(token, {
        secret: jwtConstants.secret,
      });
    } catch (error) {
        throw new HttpException({
            status: 419,
            message: "Hết thời gian xác thực"
        }, 419)
    }
  }
  async checkEmaiL(email: string) {
    try {
      const data = this.authRepository.findOne({ email: email });
      return data;
    } catch (e) {
      this.logger.error('Error in autherService checkEmail: ' + e);
      throw e;
    }
  }

  async createUser(dto: createUserDto) {
    try {
        // console.log({...(dto as any)})
        const user: SchemaCreateDocument<User> = {
            ...(dto as any),
        };
        const res= await this.authRepository.createOne(user)
        return res;
    } catch (error) {
        this.logger.error('Error in userService createuser: ' + error);
        throw error;
    }
}
}
