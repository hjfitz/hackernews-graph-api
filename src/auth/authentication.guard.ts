import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthService } from './auth.service';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const executionCtx = GqlExecutionContext.create(context);
    const { headers } = executionCtx.getContext().req;

    const [, token] = headers.authorization.split(' ');

    const canAuth = await this.authService.verifyJwt(token);
    return !!canAuth;
  }
}
