import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from 'src/auth/entities/user.entity';
import { PostService } from 'src/post/post.service';
import { postsSeed, usersSeed } from './data/seed-data';

@Injectable()
export class SeedService {
  constructor(
    private readonly postService: PostService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async runSeed() {
    await this.deleteTables();

    const users = await this.insertUsers();

    await this.insertNewPosts(users);

    return 'SEED EXECUTED';
  }

  private async deleteTables() {
    await this.postService.deleteAllPost();

    const queryBuilder = this.userRepository.createQueryBuilder();
    await queryBuilder.delete().where({}).execute();
  }

  private async insertUsers() {
    const seedUsers = usersSeed;
    const users: User[] = [];

    seedUsers.forEach((user) => {
      users.push(this.userRepository.create(user));
    });

    const dbUsers = await this.userRepository.save(seedUsers);

    return dbUsers;
  }

  private async insertNewPosts(users: User[]) {
    const posts = postsSeed;
    const insertPromises = [];

    posts.forEach((post) => {
      insertPromises.push(
        this.postService.create(
          post,
          users[Math.floor(Math.random() * users.length)],
        ),
      );
    });

    await Promise.all( insertPromises );
    return true;
  }
}
