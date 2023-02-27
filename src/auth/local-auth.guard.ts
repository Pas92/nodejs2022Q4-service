import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  handleRequest<TUser = any>(
    err: any,
    user: any,
    info: any,
    context: ExecutionContext,
    status?: any,
  ): TUser {
    const request = context.switchToHttp().getRequest();
    console.warn('Guard');
    // console.log(request);
    // console.dir(err);
    console.dir(user);
    // console.dir(info);
    // console.dir(context);
    // console.dir(status);
    return super.handleRequest(err, user, info, context, status);
  }
}
