import { Injectable } from '@nestjs/common';
import makeUuid from '@/utils/makeUuid';

@Injectable()
export class AuthService {
  setCookie() {
    return makeUuid();
  }
}
