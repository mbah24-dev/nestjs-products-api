/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   purchase-utils.ts                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/15 14:12:37 by mbah              #+#    #+#             */
/*   Updated: 2025/03/15 14:49:13 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class PurchaseUtils {
	constructor(private readonly prismaService: PrismaService) {}
	
	async checkPurchase(product: any, userId: string, productId: string, quantity: number) {
		if (!product) 
			throw new HttpException("Ce produit n'existe pas", HttpStatus.NOT_FOUND);
		// Vérifie si l'utilisateur tente d'acheter son propre produit
		if (userId === product.sellerId) 
			throw new HttpException("Vous ne pouvez pas acheter vos propres produits", HttpStatus.FORBIDDEN);
		// Vérifie la disponibilité du stock
		if (product.stock < quantity) {
			if (product.status === "disabled") {
				throw new HttpException("Ce produit est en rupture de stock", HttpStatus.NOT_FOUND);
			} else {
				throw new HttpException("La quantité souhaitée n'est pas disponible", HttpStatus.BAD_REQUEST);
			}
		}
		//return la transaction si elle exite deja , sinon un objet undefined est retourner
		return (await this.prismaService.productPurchase.findUnique({
			where: {
				userId_productId: { userId, productId }
			}
		}));
	}

	async getNewPurchase(existingPurchase: any, userId: string, productId: string, quantity: number) {
		let newPurchase = await this.prismaService.$transaction(async (prisma) => {
			let purchase: any;

			if (!existingPurchase) {
				purchase = await prisma.productPurchase.create({
					data: { userId, productId, quantity }
				});
			} else {
				purchase = await prisma.productPurchase.update({
					where: {
						userId_productId: { userId, productId }
					},
					data: {
						quantity: existingPurchase.quantity + quantity
					}
				});
			}
			// Mise à jour du stock
			await prisma.product.update({
				where: { id: productId },
				data: { stock: { decrement: quantity } }
			});
			return (purchase);
		});
		return (newPurchase);
	}
}