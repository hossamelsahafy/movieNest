import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  signup() {
    return 'Signed Up';
  }
  signin() {
    return 'Signed In';
  }
}
