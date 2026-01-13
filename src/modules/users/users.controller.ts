import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';
import { ActiveUserId } from 'src/shared/decorators/activeUserId';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @UseGuards(AuthGuard)
  me(@ActiveUserId() userId: string) {
    return this.usersService.getUserById(userId);
  }
}
