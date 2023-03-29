import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthService } from './auth.service';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  // expects that the user id is passed as 'userid' in graph
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const executionCtx = GqlExecutionContext.create(context);
    const { headers } = executionCtx.getContext().req;

    const [, token] = headers.authorization.split(' ');

    const canAuth = await this.authService.verifyJwt(token);

    if (!canAuth) return false;

    const { userId } = executionCtx.getArgs();
    console.log({ canAuth });

    return canAuth === userId;
  }
}
