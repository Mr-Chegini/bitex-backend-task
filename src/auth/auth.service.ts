import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dtos/login.dto';
import { matchHashedPassword } from 'src/common/utils/password';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;

    const user = await this.usersRepository.findOne({
      where: { username: username.toLowerCase() },
    });

    if (!user || !user.username) {
      throw new UnauthorizedException('Invalid Credentials.');
    }

    const isPasswordValid = await matchHashedPassword(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid Credentials.');
    }

    const token = await this.generateAccessToken(user);

    return { token };
  }

  async verifyToken(token: string): Promise<any> {
    try {
      const decoded = await this.jwtService.verifyAsync(token);
      return decoded;
    } catch (error) {
      // Handle token verification errors
      throw new UnauthorizedException('Invalid token');
    }
  }
  async generateAccessToken(user: User): Promise<string> {
    try {
      const payload = {
        id: user.id,
        //   isAdmin: user.is_admin,
      };

      const token = await this.jwtService.signAsync(payload);
      return token;
    } catch (err) {
      console.log('err:', err);
      // throw new
    }
  }
}
