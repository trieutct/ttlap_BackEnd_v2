import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorator/roles.decorator';
@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector:Reflector){}
  canActivate(context: ExecutionContext): boolean{
    try{
      const request=context.switchToHttp().getRequest()
      const role= this.reflector.getAllAndMerge(ROLES_KEY,[context.getClass(),context.getHandler()])
      if(role===request.loggedInUser.data.role)
          return true
      return false
    }catch(error)
    {
        console.log("Error Role Guard ts "+error)
    }
  }
}