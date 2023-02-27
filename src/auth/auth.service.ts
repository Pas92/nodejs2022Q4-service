import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

import { JwtService } from '@nestjs/jwt';
import { FindUserDTO } from 'src/user/dto/find-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(login: string, password: string): Promise<FindUserDTO> {
    console.log('Validate user');
    const user = await this.userService.findOneByLogin(login);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }

    if (user.password !== password) {
      throw new ForbiddenException();
    }

    return null;
  }

  async login(user: FindUserDTO) {
    const payload = { username: user.login, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
