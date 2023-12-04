// jwt.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service'; // Replace with your actual AuthService

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];

    if (token) {
      try {
        const decodedUser = await this.authService.verifyToken(token);
        req.user = decodedUser; // Attach user information to the request
      } catch (error) {
        // Handle token verification errors
      }
    }

    next();
  }
}
