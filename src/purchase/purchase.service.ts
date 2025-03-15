/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   purchase.service.ts                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/14 21:50:36 by mbah              #+#    #+#             */
/*   Updated: 2025/03/15 18:00:25 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePurchaseDto } from 'src/dto/create-purchase.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductsService } from 'src/products/products.service';
import { PurchaseUtils } from './purchase-utils';

@Injectable()
export class PurchaseService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly productService: ProductsService,
		private readonly purchaseUtils: PurchaseUtils
	) {}

	/**
		 * Crée un achat pour un utilisateur authentifié
		 * @param purchase - Contient l'ID de l'utilisateur, l'ID du produit et la quantité souhaitée
		 * @returns Un message de succès et les détails de l'achat
		 * @throws HttpException - Si le produit n'existe pas, si la quantité est insuffisante ou si l'utilisateur essaie d'acheter son propre produit
	*/
	async createPurchase(purchase: { userId: string, productId: string, quantity: number }) {
		try {
			const { userId, productId, quantity } = purchase;
			const product = await this.productService.getProductByID(productId);
			const existingPurchase = await this.purchaseUtils.checkPurchase(product, userId, productId, quantity);
			const newPurchase = await this.purchaseUtils.getNewPurchase(existingPurchase, userId, productId, quantity);
			const updatedProduct = await this.prismaService.product.findUnique({
				where: { id: productId }
			});
			if (updatedProduct?.stock === 0) {
				await this.prismaService.product.update({
					where: { id: productId },
					data: { status: 'disabled' }
				});
			}
			return ({
				statusCode: HttpStatus.CREATED,
				message: "Achat effectué avec succès",
				purchase: newPurchase
			});
		} catch (error) {
			throw new HttpException(error.message || "Un problème est survenu lors de la transaction", HttpStatus.BAD_REQUEST);
		}
	}

	async cancelPurchase(purchage: {userId: string, productId: string, quantity: number})
	{
		const {userId, productId, quantity} = purchage;

		const product = await this.prismaService.product.findUnique({
			where: { id: productId },
		});
		if (!product)
			throw new HttpException('ce produit n\'existe pas', HttpStatus.NOT_FOUND);
		const purchaseToCancel = await this.prismaService.productPurchase.findUnique({
			where: {
				userId_productId: {userId, productId}
			}
		});
		if (!purchaseToCancel)
			throw new HttpException('Vous n\'avez effectuer aucun achat sur cet article', HttpStatus.NOT_FOUND);
		if (quantity > purchaseToCancel.quantity)
			throw new HttpException('La quantité ne peut pas etre superieur a la quantité total du produit acheté', HttpStatus.BAD_REQUEST);
		await this.prismaService.$transaction(async (prisma) => {
			if (quantity === purchaseToCancel.quantity) {
				await prisma.productPurchase.delete({
					where: {
						userId_productId: {userId, productId}
					}
				});
			} 
			else {
				await prisma.productPurchase.update({
					where: {
						userId_productId: {userId, productId}
					},
					data: {
						quantity: (purchaseToCancel.quantity - quantity)
					}
				});
			}
			await prisma.product.update({
				where: { id: productId},
				data: {
					stock: (product.stock + quantity),
					status: "enabled"
				}
			});
		})
		return ({
			message: 'La transaction a été annulé avec succèe',
		});
	}

	async getAllPurchase(userId: string) {
		const purchaseList = await this.prismaService.productPurchase.findMany({
			where: { userId },
			include: {
				product: true
			},
		});
		if (!purchaseList || purchaseList.length === 0) {
			throw new HttpException('La liste de transaction est vide []', HttpStatus.NOT_FOUND);
		}
		return (purchaseList);
	}
	
}
