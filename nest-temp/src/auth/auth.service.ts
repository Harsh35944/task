import {
  HttpStatus,
  Injectable,
  UnauthorizedException,
  HttpException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Role } from '../common/enums/role.enum';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    try {
      const user = await this.usersService.validateUser(
        loginDto.email,
        loginDto.password,
      );
      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }

      return {
        statusCode: HttpStatus.OK,
        message: 'Login successfully',
        data: user,
        accessToken: this.generateToken(user),
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        'Something went wrong, please try again later.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async register(createUserDto: CreateUserDto) {
    try {
      const user = await this.usersService.create(createUserDto, Role.USER);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Register successfully',
        accessToken: this.generateToken(user),
        data: user,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        'Something went wrong, please try again later.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private generateToken(user): string {
    try {
      const payload = { email: user.email, sub: user._id, role: user.role };
      return this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
      });
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        'Something went wrong, please try again later.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
