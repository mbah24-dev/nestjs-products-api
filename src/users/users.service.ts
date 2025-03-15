/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   users.service.ts                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/13 01:43:37 by mbah              #+#    #+#             */
/*   Updated: 2025/03/14 13:57:41 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Injectable } from '@nestjs/common';
import { RequestWithUser } from 'src/auth/jwt.strategy';
import { BcryptUtils } from 'src/bcrypt/bcrypt-utils.service';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly bcryptUtils: BcryptUtils
	) {}
	
	async addUser(user: CreateUserDto) {
		const {fullname, email, password} = user;
		const foundUser = await this.prisma.user.findUnique({ 
			where: { email }
		});
		if (foundUser) {
			throw new Error('Cet email est déjà associé à un compte.');
		}
		const hashedPassword = await this.bcryptUtils.hashPassword(password);
		const newUser =  await this.prisma.user.create({
			data: {
				fullname,
				email,
				password: hashedPassword
			}
		});
		return ({userId: newUser.id});
	}

	async getAllUsers() {
		const users = await this.prisma.user.findMany({
			select: {
				id: true,
				fullname: true,
				email: true,
				password: true
			},
		});
		return (users);
	}

	async getUserByID(id: string) {
		if (!id) {
			throw new Error('invalid id');
		}
		const user = await this.prisma.user.findUnique({
			where: {
				id
			}
		});
		if (!user) {
			throw new Error('User not found');
		}
		return (user);
	}

	async updateUser(id: string, newUser: CreateUserDto) {
		const user = await this.getUserByID(id);
		if (!user) {
			throw new Error('User not found');
		}
		if (newUser.password) {
			newUser.password = await this.bcryptUtils.hashPassword(newUser.password);
		}
		return (await this.prisma.user.update({
			where: { id },
			data: newUser
		}));
	}

	async deleteUser(id: string, req: RequestWithUser) {
		const user = await this.getUserByID(id);
		if (!user) {
			throw new Error('User not found');
		}
		if (user.id !== req.user.userId) {
			return ({message: 'access denied'});
		}
		await this.prisma.user.delete({
			where: { id },
		});
		return ({ message: 'User deleted successfully'});
	}
}
