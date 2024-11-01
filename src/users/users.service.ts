import { Injectable } from '@nestjs/common';
import { UserDto } from './user.dto';
import { v4 as uuid } from 'uuid';
import { hashSync as bcryptHashSync } from 'bcrypt';
@Injectable()
export class UsersService {
  private users: UserDto[] = [];
  create(user: UserDto) {
    user.id = uuid();
    user.password = bcryptHashSync(user.password, 10);
    this.users.push(user);
    console.log(user);
  }
}
