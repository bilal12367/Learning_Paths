import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { InvalidTokenException } from 'src/exceptions/auth_exceptions/auth.exceptions';
import { JwtService } from 'src/jwt/jwt.service';


interface IRequest extends Request {
  user: { id: string }
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService,private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    
    const exemptRoute = this.reflector.get<boolean>('exempt',context.getClass())
    
    if(exemptRoute) 
      return true;
    
    const request: IRequest = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(request)
    if(!token) 
      throw new InvalidTokenException()
    
    const user = this.jwtService.verifyToken(token);
    request.user = user;
    return true;
  }

  extractTokenFromHeader(req: Request): string {
    const header : string = req.headers['authorization']
    if(header.startsWith('Bearer')){
      return header.substring(7)
    }
    return null
  }

  


  
}
