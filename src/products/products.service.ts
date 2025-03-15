/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   products.service.ts                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/13 01:04:33 by mbah              #+#    #+#             */
/*   Updated: 2025/03/14 20:48:24 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from 'src/dto/create-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
	constructor(private readonly prismaService: PrismaService) {}

	async addProduct(Product: CreateProductDto, userId: string) {
		const {name, price, stock}: CreateProductDto = Product;
		const newProduct = await this.prismaService.product.create({
			data: {
				name,
				price,
				stock,
				sellerId: userId
			}
		});
		if (!newProduct) {
			throw new HttpException('Impossible d\'ajouter ce produit', HttpStatus.BAD_REQUEST);
		}
		return ({
			code: 201,
			message: 'votre produit a été ajouter',
			product: newProduct
		});
	}

	async getAllProduct() {
		const products = await this.prismaService.product.findMany();
		if (products.length === 0) {
			throw new HttpException('Aucun produit trouver', HttpStatus.NOT_FOUND);
		}
		return ({
			message: 'Liste de tous les produits',
			products
		});
	}

	async getProductByID(productId: string) {
		const product = await this.prismaService.product.findUnique({
			where: {id: productId}
		});
		if (!product) {
			throw new HttpException('ce produit n\'exite pas', HttpStatus.NOT_FOUND);
		}
		return (product);
	}

	async getProductsBySeller(userId: string) {
		const products = await this.prismaService.product.findMany({
			where: {sellerId: userId}
		});
		if (products.length === 0) {
			throw new HttpException('Aucun produit trouver', HttpStatus.NOT_FOUND);
		}
		return ({
			message: 'Liste de vos produits',
			products
		});
	}

	async getPurchasedProducts(userId: string) {
		const purchaseProduct = await this.prismaService.productPurchase.findMany({
			where: { userId },
			include: {product: true}
		});
		if (purchaseProduct.length === 0) {
			throw new HttpException('Aucun produit acheté trouvé', HttpStatus.NOT_FOUND);
		}
		return ({
			message: 'Liste des produits acheté',
			purchaseProduct
		});
	}

	async updateProduct(productId: string, newProduct: CreateProductDto) {
		const productUpdated = await this.prismaService.product.update({
			where: {id: productId},
			data: newProduct
		});
		if (!productUpdated) {
			throw new HttpException('Impossible de mettre a jour ce produit', HttpStatus.BAD_REQUEST);
		}
		return (productUpdated);
	}

	async deleteProduct(productId: string) {
		try {
			const deletedProduct = await this.prismaService.product.delete({
				where: {id: productId}
			})
			return (
			    { message: 'Produit supprimé avec succès', deletedProduct }
			);
		} catch (error) {
			throw new HttpException('impossible de supprimer ce produit', HttpStatus.NOT_FOUND);
		}
	}

	async getSellerByProductId(productId: string) {
		const product = await this.prismaService.product.findUnique({
			where: {id: productId},
			include: { seller: true}
		});
		if (!product) {
			throw new HttpException('Aucun produit trouvé', HttpStatus.NOT_FOUND);
		}
		if (!product.seller) {
			throw new HttpException('Aucun vendeur trouvé pour ce produit', HttpStatus.NOT_FOUND);
		}
		return (product.seller);
	}

	async getBuyersByProductId(productId: string) {
		const product = await this.prismaService.product.findUnique({
			where: {id: productId},
			include: {
				purchases: {
					include: {user: true }
				}
			}
		});
		if (!product  || product.purchases.length === 0) {
			throw new HttpException('Aucun acheteur trouvé pour ce produit', HttpStatus.NOT_FOUND);
		}
		return (product.purchases.map(purchase => purchase.user));
	}
}
