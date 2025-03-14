/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   auth.module.ts                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/13 02:03:59 by mbah              #+#    #+#             */
/*   Updated: 2025/03/13 23:19:09 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { BcryptUtils } from 'src/bcrypt/bcrypt-utils.service';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
	JwtModule.register({
		global: true,
		secret: process.env.JWT_SECRET,
		signOptions: { expiresIn: '7d' }
	}),
  ],
  providers: [AuthService, BcryptUtils, UsersService, PrismaService, JwtModule, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
