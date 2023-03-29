import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/schema.generated';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    private readonly authService: AuthService,
  ) {}

  // TODO: should live in authservice or loginservice
  public async createSession(
    username: string,
    password: string,
  ): Promise<{ token: string } | null> {
    const foundUser = await this.usersRepository.findOneBy({ username });

    if (!foundUser) return null;

    const isValidUser = await this.authService.canUserLogin(
      username,
      password,
      foundUser,
    );

    if (!isValidUser) return null;

    // create jwt
    const token = await this.authService.provisionToken(foundUser);

    return token;
  }

  public async fetchUserById(id: string): Promise<UserEntity> {
    const foundUser = await this.usersRepository.findOneBy({ id });
    if (!foundUser) return null;

    if (!foundUser.posts) foundUser.posts = [];

    return foundUser;
  }

  public async createUser(username: string, password: string) {
    const foundUser = await this.usersRepository.findOneBy({
      username,
    });

    if (foundUser) return null;

    const passHash = await this.authService.hashPassword(password);

    const createdUser = await this.usersRepository.create({
      username,
      passHash,
      posts: [],
    });

    await this.usersRepository.save(createdUser);

    return createdUser;
  }
}
