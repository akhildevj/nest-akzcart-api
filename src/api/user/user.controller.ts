import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { MessageDto } from 'src/models/message.dto';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { UserBodyDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: UserBodyDto })
  @ApiResponse({ status: 200, type: MessageDto })
  signup(
    @Body() body: UserBodyDto,
  ): Observable<MessageDto | Record<null, null>> {
    return this.userService.signup(body);
  }
}
