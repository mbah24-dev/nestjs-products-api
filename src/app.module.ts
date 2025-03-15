/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   app.module.ts                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/13 01:03:38 by mbah              #+#    #+#             */
/*   Updated: 2025/03/15 15:14:20 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { PrismaService } from './prisma/prisma.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PurchaseService } from './purchase/purchase.service';
import { PurchaseController } from './purchase/purchase.controller';
import { PurchaseModule } from './purchase/purchase.module';
import { ProductsService } from './products/products.service';
import { PurchaseUtils } from './purchase/purchase-utils';

@Module({
  imports: [
	ProductsModule,
	UsersModule,
	AuthModule,
	ConfigModule.forRoot({
		isGlobal: true,
	}),
	PurchaseModule
],
  controllers: [PurchaseController],
  providers: [PrismaService, PurchaseService, ProductsService, PurchaseUtils],
})
export class AppModule {}
