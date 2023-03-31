import { UseGuards } from '@nestjs/common';
import { AuthenticationGuard } from './authentication.guard';
import { AuthorizationGuard } from './authorization.guard';

export const UseAuthZGuard = () => UseGuards(AuthorizationGuard);
export const UseAuthNGuard = () => UseGuards(AuthenticationGuard);
