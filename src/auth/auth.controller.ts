import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { Request } from '@nestjs/common/decorators';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { AuthEntity } from './entities/auth.entity';
import { LocalAuthGuard } from './local-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('/signup')
  @ApiOperation({
    summary: 'Sign up',
    description: 'Signup new account with personal login & password',
  })
  @ApiResponse({
    status: 400,
    description:
      'Bad request. body does not contain required fields or fields have invalid typos',
  })
  async create(@Body() createAuthDto: CreateUserDto) {
    return await this.userService.create(createAuthDto);
  }

  @Post('/login')
  @UseGuards(LocalAuthGuard)
  @ApiOperation({
    summary: 'Login',
    description:
      'Login with personal login & password, server returns response with Access token and Refresh token',
  })
  @ApiResponse({
    status: 400,
    description:
      'Bad request. body does not contain required fields or fields have invalid typos',
  })
  @ApiResponse({
    status: 403,
    description: 'Invalid login or password',
  })
  async login(@Request() req, @Body() login: AuthEntity) {
    console.log('Login');
    console.log(req.user);
    return await this.authService.login(req.user);
  }
}
