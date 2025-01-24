import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { dot } from 'node:test/reporters';
import { AuthDto, SigninDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private Prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}
  async signup(dto: AuthDto) {
    const Hash = await argon.hash(dto.Password);
    try {
      const user = await this.Prisma.user.create({
        data: {
          Email: dto.Email,
          Hash: Hash,
          FirstName: dto.FirstName,
          LastName: dto.LastName,
        },
      });
      return {
        user,
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new ForbiddenException('Email Already Exist');
      }
    }
  }
  async signin(dto: SigninDto) {
    const user = await this.Prisma.user.findUnique({
      where: { Email: dto.Email },
    });
    if (!user) {
      throw new ForbiddenException('Credentials Incorrect');
    }
    const IsMatchedPw = await argon.verify(user.Hash, dto.Password);
    if (!IsMatchedPw) {
      throw new ForbiddenException('Credentials Incorrect');
    }
    return this.generateJWTToken(user.id, user.Email);
  }
  private async generateJWTToken(userId: number, email: string) {
    const payload = { sub: userId, email };
    const token = await this.jwtService.signAsync(payload);
    return { access_token: token };
  }
}
