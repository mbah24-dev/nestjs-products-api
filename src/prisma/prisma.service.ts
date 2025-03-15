/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   prisma.service.ts                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/13 01:41:47 by mbah              #+#    #+#             */
/*   Updated: 2025/03/13 03:48:15 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
	async onModuleInit() {
		await (this.$connect());
	}

	async onModuleDestroy() {
		await (this.$disconnect());
	}
}