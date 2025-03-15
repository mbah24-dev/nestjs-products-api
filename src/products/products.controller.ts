/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   products.controller.ts                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/13 01:04:23 by mbah              #+#    #+#             */
/*   Updated: 2025/03/14 19:29:29 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Body, Controller, Get, Post, Request, UseGuards, Param, Put, HttpException, HttpStatus, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from 'src/dto/create-product.dto';
import { RequestWithUser } from 'src/auth/jwt.strategy';
import { UsersService } from 'src/users/users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('products')
export class ProductsController {
	constructor(
		private readonly productsService: ProductsService,
		private readonly usersService: UsersService
	) {}

	// Ajouter un produit
	@UseGuards(JwtAuthGuard)
	@Post()
	async addProduct(@Body() product: CreateProductDto, @Request() req: RequestWithUser) {
		const userAuth = await this.usersService.getUserByID(req.user.userId);
		return (await this.productsService.addProduct(product, userAuth.id));
	}

	// Liste des produits disponibles
	@UseGuards(JwtAuthGuard)
	@Get()
	async getAllProduct() {
		return (await this.productsService.getAllProduct());
	}

	// Récupérer un produit spécifique
	@UseGuards(JwtAuthGuard)
	@Get(':id')
	async getProductByID(@Param('id') productId: string) {
		return (await this.productsService.getProductByID(productId));
	}

	// Modifier un produit
	@UseGuards(JwtAuthGuard)
	@Put(':id')
	async updateProduct(
		@Param('id') productId: string,
		@Body() newProduct: CreateProductDto,
		@Request() req: RequestWithUser
	) {
		const product = await this.productsService.getProductByID(productId);
		if (!product) {
			throw new HttpException('Produit introuvable', HttpStatus.NOT_FOUND);
		}
		if (req.user.userId !== product.sellerId)
			throw new HttpException('Vous n\'êtes pas autorisé à modifier ce produit', HttpStatus.FORBIDDEN);
		return (await this.productsService.updateProduct(productId, newProduct));
	}

	// Supprimer un produit
	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	async deleteProduct(
		@Param('id') productId: string,
		@Request() req: RequestWithUser
	) {
		const product = await this.productsService.getProductByID(productId);
		if (!product) {
			throw new HttpException('Produit introuvable', HttpStatus.NOT_FOUND);
		}
		if (req.user.userId !== product.sellerId) {
			throw new HttpException('Vous n\'êtes pas autorisé à supprimer ce produit', HttpStatus.FORBIDDEN);
		}
		return (await this.productsService.deleteProduct(productId));
	}

	// Obtenir le vendeur d'un produit spécifique
	@UseGuards(JwtAuthGuard)
	@Get(':id/seller')
	async getSellerByProductId(@Param('id') productId: string) {
		return (await this.productsService.getSellerByProductId(productId));
	}

	// Obtenir les acheteurs d'un produit spécifique
	@UseGuards(JwtAuthGuard)
	@Get(':id/buyers')
	async getBuyersByProductId(@Param('id') productId: string) {
		return (await this.productsService.getBuyersByProductId(productId));
	}
}
