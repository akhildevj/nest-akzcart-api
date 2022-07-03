import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { alt } from 'joi';
import { async, Observable, reduce } from 'rxjs';
import { MessageDto } from 'src/models/message.dto';
import { UserIdDto } from 'src/models/user-id.dto';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import {
  UpdateUserBodyDto,
  UserBodyDto,
  UserResponseDto,
} from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Get current user' })
  @ApiParam({ name: 'id' })
  @ApiResponse({ status: 200, type: UserResponseDto })
  getUser(
    @Param() params: UserIdDto,
  ): Observable<UserResponseDto | Record<null, null>> {
    return this.userService.getUser(params);
  }

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

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Update user details' })
  @ApiParam({ name: 'id' })
  @ApiBody({ type: UpdateUserBodyDto })
  @ApiResponse({ status: 200, type: MessageDto })
  updateUser(
    @Param() params: UserIdDto,
    @Body() body: UpdateUserBodyDto,
  ): Observable<MessageDto | Record<null, null>> {
    return this.userService.updateUser(params, body);
  }
}
