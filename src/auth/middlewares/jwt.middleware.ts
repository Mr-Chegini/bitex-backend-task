// jwt.middleware.ts
import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(
    // private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];

    if (token) {
      try {
        const decodedUser = await this.jwtService.verifyAsync(token);
        req['user'] = decodedUser; // Attach user information to the request
      } catch (error) {
        // Handle token verification errors
        throw new UnauthorizedException('Invalid token');
      }
    }

    next();
  }
}
