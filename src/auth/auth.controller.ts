/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   auth.controller.ts                                 :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/13 02:03:55 by mbah              #+#    #+#             */
/*   Updated: 2025/03/13 22:01:14 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninUserDto } from 'src/dto/signin-user.dto';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RequestWithUser } from './jwt.strategy';

@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly userService: UsersService
	) {}
	
	@UseGuards(JwtAuthGuard)
	@Get()
	async authenticateUser(@Request() req: RequestWithUser) {
		return (await this.userService.getUserByID(req.user.userId));
	}
	
	@Post('signin')
	async signin(@Body() userInfo: SigninUserDto) {
		return (await this.authService.signin(userInfo));
	}

	@Post('signup')
	async signup(@Body() userInfo: CreateUserDto) {
		return (await this.authService.signup(userInfo));
	}

}
