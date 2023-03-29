import * as bcrypt from 'bcrypt';
import * as jsonwebtoken from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/users/user.entity';

@Injectable()
export class AuthService {
  // TODO: env
  private readonly saltRounds = 10;
  private readonly jwtSecret = 'aaaaaaaa';

  public async hashPassword(password: string) {
    return bcrypt.hash(password, this.saltRounds);
  }

  // returns ID of the user belonging to the token
  public async verifyJwt(token: string): Promise<string | false> {
    try {
      const decodedToken = await jsonwebtoken.verify(token, this.jwtSecret);
      // @ts-expect-error config issue
      return decodedToken.id;
    } catch (e) {
      return false;
    }
  }

  public fetchUserId(token: string): string {
    const [, rawPayload] = token.split('.');
    const strPayload = Buffer.from(rawPayload, 'base64').toString('utf8');
    const payload = JSON.parse(strPayload);
    return payload.id;
  }

  public async provisionToken(user: UserEntity): Promise<{ token: string }> {
    const ourUser = { ...user };
    delete ourUser.passHash;
    const token = await jsonwebtoken.sign(ourUser, this.jwtSecret);
    return { token };
  }

  public async canUserLogin(
    username: string,
    password: string,
    userEntity: UserEntity,
  ) {
    if (username !== userEntity.username) return false;

    const passMatch = await bcrypt.compare(password, userEntity.passHash);

    return passMatch;
  }
}
