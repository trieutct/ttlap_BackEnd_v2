import {
    CanActivate,
    ExecutionContext,
    HttpException,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { jwtConstants } from '../../common/constants';
  import { Request } from 'express';
import { UserService } from '../user/service/user.service';
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService,private userService:UserService) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new UnauthorizedException();
      }
      try {
        const payload = await this.jwtService.verifyAsync(
          token,
          {
            secret: jwtConstants.secret
          }
        );
        //check tồn tại userId
        const user=await this.userService.findUserById(payload.data.id)
        if(!user)
        {
          throw new UnauthorizedException();
        }
        request.loggedInUser=payload
        request.userToken=token
      } catch {
        throw new HttpException({
            status: 419,
            message: "Hết thời gian đăng nhập. Vui lòng đăng nhập lại"
        }, 419)
      }
      return true;
    }
  
    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  }