import { BadRequestException, Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { DatabaseService } from 'src/database/database.service';
import { MessageDto } from 'src/models/message.dto';
import { ADD_MESSAGE, USER_EXISTS } from 'src/shared/constants';
import { signupQuery } from './db-queries/user.query';
import { UserBodyDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService<any>) {}

  signup(body: UserBodyDto): Observable<MessageDto | Record<null, null>> {
    const { id, name, email } = body;
    return this.databaseService
      .rawQuery(signupQuery, [id, name, email], UserBodyDto)
      .pipe(
        map(rows => {
          if (!rows.length) throw new BadRequestException(USER_EXISTS);
          return { success: true, message: ADD_MESSAGE };
        }),
      );
  }
}
