/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   users.controller.ts                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/13 01:43:25 by mbah              #+#    #+#             */
/*   Updated: 2025/03/14 20:56:13 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Body, Controller, Delete, Get, Param, Put, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RequestWithUser } from 'src/auth/jwt.strategy';
import { ProductsService } from 'src/products/products.service';

@Controller('users')
export class UsersController {
	constructor(
		private readonly usersService: UsersService,
		private readonly productsService: ProductsService
	) {}
	
	@UseGuards(JwtAuthGuard)
	@Get()
	async getAllUsers() {
		return (await this.usersService.getAllUsers());
	}

	@UseGuards(JwtAuthGuard)
	@Get(':id')
	async getUserByID(@Param('id') id: string) {
		return (await this.usersService.getUserByID(id));
	}
	
	@UseGuards(JwtAuthGuard)
	@Put(':id')
	async updateUser(@Param('id') id: string, @Body() newUser: CreateUserDto) {
		return (await this.usersService.updateUser(id, newUser));
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	async deleteUser(@Param('id') id: string, @Request() req: RequestWithUser) {
		return (await this.usersService.deleteUser(id, req));
	}

	// Liste des produits de l'utilisateur connecté
	@UseGuards(JwtAuthGuard)
	@Get('me/products')
	async getProductsBySeller(@Request() req: RequestWithUser) {
		return (await this.productsService.getProductsBySeller(req.user.userId));
	}

	// Liste des produits achetés par l'utilisateur connecté
	@UseGuards(JwtAuthGuard)
	@Get('me/purchased-products')
	async getPurchasedProducts(@Request() req: RequestWithUser) {
		return (await this.productsService.getPurchasedProducts(req.user.userId));
	}
}
