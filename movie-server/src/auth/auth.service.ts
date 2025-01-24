import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { dot } from 'node:test/reporters';
import { AuthDto } from './dto';
import { userInfo } from 'os';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {
  constructor(private Prisma: PrismaService) {}
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
  signin() {
    return 'Signed In';
  }
}
