import { BadRequestException, Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { DatabaseService } from 'src/database/database.service';
import { MessageDto } from 'src/models/message.dto';
import { UserIdDto } from 'src/models/user-id.dto';
import {
  ADD_MESSAGE,
  GET_MESSAGE,
  INVALID_ID,
  UPDATE_MESSAGE,
  USER_EXISTS,
} from 'src/shared/constants';
import {
  getUserQuery,
  signupQuery,
  updateUserQuery,
} from './db-queries/user.query';
import { UpdateUserBodyDto, UserBodyDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService<any>) {}

  getUser(params: UserIdDto): Observable<MessageDto | Record<null, null>> {
    const { id } = params;

    return this.databaseService.rawQuery(getUserQuery, [id], UserBodyDto).pipe(
      map(usersArr => {
        return { success: true, message: GET_MESSAGE, user: usersArr[0] };
      }),
    );
  }

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

  updateUser(
    params: UserIdDto,
    body: UpdateUserBodyDto,
  ): Observable<MessageDto | Record<null, null>> {
    const { id } = params;
    const { address, bio, imageUrl, mobile, name } = body;

    return this.databaseService
      .rawQuery(
        updateUserQuery,
        [name, imageUrl, bio, mobile, address, id],
        UserBodyDto,
      )
      .pipe(
        map(rows => {
          if (!rows.length) throw new BadRequestException(INVALID_ID);
          return { success: true, message: UPDATE_MESSAGE };
        }),
      );
  }
}
