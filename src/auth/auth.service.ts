/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   auth.service.ts                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/13 02:04:04 by mbah              #+#    #+#             */
/*   Updated: 2025/03/13 20:53:06 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { BcryptUtils } from 'src/bcrypt/bcrypt-utils.service';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { SigninUserDto } from 'src/dto/signin-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly bcryptUtils: BcryptUtils,
		private readonly userService: UsersService
	) {}
	
	async signin(signinBody: SigninUserDto) {
		const {email, password} = signinBody;
		const foundUser = await this.prismaService.user.findUnique({
			where: { email }
		});
		if (!foundUser) {
			throw new UnauthorizedException('Email ou mot de passe incorrect.');
		}
		const isValidPassword = await this.bcryptUtils.isValidPassword(password, foundUser.password);
		if (!isValidPassword) {
			throw new UnauthorizedException('Email ou mot de passe incorrect.');
		}
		return (this.bcryptUtils.generateToken({ userId: foundUser.id }));
	}

	async signup(signupBody: CreateUserDto) {
		const addUserObject = await this.userService.addUser(signupBody);
		return (this.bcryptUtils.generateToken({ userId: addUserObject.userId }));
	}
}
