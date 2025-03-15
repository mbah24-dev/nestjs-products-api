/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   purchase.module.ts                                 :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/14 21:50:40 by mbah              #+#    #+#             */
/*   Updated: 2025/03/15 15:13:58 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { BcryptUtils } from 'src/bcrypt/bcrypt-utils.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductsService } from 'src/products/products.service';
import { UsersService } from 'src/users/users.service';
import { PurchaseController } from './purchase.controller';
import { PurchaseService } from './purchase.service';
import { PurchaseUtils } from './purchase-utils';

@Module({
	 imports: [],
	 providers: [
		UsersService,
		BcryptUtils,
		PrismaService,
		JwtModule,
		ProductsService,
		PurchaseService,
		PurchaseUtils
	],
	 controllers: [PurchaseController]
})
export class PurchaseModule {}
