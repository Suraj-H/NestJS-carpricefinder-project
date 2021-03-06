import { Body, ClassSerializerInterceptor, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, UseInterceptors } from '@nestjs/common';
import { Serialize, SerializerInterceptor } from 'src/interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { UsersService } from './users.service';


@Serialize(UserDto)
@Controller('auth')
export class UsersController {

  constructor(private userService: UsersService,
     private authService: AuthService) { }

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {

    this.authService.signup(body.email, body.password);
  }

  @Post('/signin')
  signin(@Body() body: CreateUserDto) {

    this.authService.signin(body.email, body.password);
  }

  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.userService.findOne(parseInt(id));

    if (!user)
      throw new NotFoundException('user not found');

    return user;
  }

  
  @Get()
  findAllUsers(@Query('email') email: string) {

    return this.userService.find(email);
  }


  @Delete('/:id')
  removeUser(@Param('id') id: string) {

    return this.userService.remove(parseInt(id));
  }


  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {

    return this.userService.update(parseInt(id), body);
  }

}
