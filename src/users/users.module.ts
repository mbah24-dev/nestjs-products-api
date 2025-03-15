/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   users.module.ts                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/13 01:43:33 by mbah              #+#    #+#             */
/*   Updated: 2025/03/14 19:29:12 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { BcryptUtils } from 'src/bcrypt/bcrypt-utils.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { ProductsService } from 'src/products/products.service';

@Module({
  imports: [],
  providers: [UsersService, BcryptUtils, PrismaService, JwtModule, ProductsService],
  controllers: [UsersController]
})
export class UsersModule {}
