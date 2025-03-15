/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   purchase.controller.ts                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/14 21:50:44 by mbah              #+#    #+#             */
/*   Updated: 2025/03/15 21:23:25 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Request, UseGuards } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RequestWithUser } from 'src/auth/jwt.strategy';
import { CreatePurchaseDto } from 'src/dto/create-purchase.dto';

@Controller('purchase')
export class PurchaseController {
	constructor(private readonly purchaseService: PurchaseService) {}

	@UseGuards(JwtAuthGuard)
	@Post(':productID')
	async createPurchase(
		@Param('productID') productID: string,
		@Body() purchaseBody: CreatePurchaseDto,
		@Request() req: RequestWithUser
	) {
	   try {
			return (await this.purchaseService.createPurchase({
				userId: req.user.userId,
				productId: productID,
				quantity: purchaseBody.quantity
			}))
	   } catch (error) {
			throw new HttpException(error.message || 'Erreur lors de la transaction', HttpStatus.BAD_REQUEST);
	   }
	}

	@UseGuards(JwtAuthGuard)
	@Delete('cancel/:productId')
	async cancelPurchase(
		@Param('productId') productId: string,
		@Body() purchaseBodyDto: CreatePurchaseDto,
		@Request() req: RequestWithUser
	) {
		try {
			return (await this.purchaseService.cancelPurchase({
				userId: req.user.userId,
				productId,
				quantity: purchaseBodyDto.quantity
			}));
		} catch (error) {
			throw new HttpException(error.message || 'Un probleme est survenue lors de l\'annulation', HttpStatus.BAD_REQUEST);
		}
	}
	
	@UseGuards(JwtAuthGuard)
	@Get()
	async getAllPurchase(@Request() req: RequestWithUser) {
		return (await this.purchaseService.getAllPurchase(req.user.userId));
	}

	
}
