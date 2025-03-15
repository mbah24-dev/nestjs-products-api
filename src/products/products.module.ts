/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   products.module.ts                                 :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/13 01:04:29 by mbah              #+#    #+#             */
/*   Updated: 2025/03/14 13:28:06 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { BcryptUtils } from 'src/bcrypt/bcrypt-utils.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [ProductsService, PrismaService, UsersService, BcryptUtils, JwtModule],
  controllers: [ProductsController]
})
export class ProductsModule {}
