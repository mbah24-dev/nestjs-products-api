/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   bcrypt-utils.service.ts                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/13 02:42:12 by mbah              #+#    #+#             */
/*   Updated: 2025/03/13 18:25:28 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcrypt'

@Injectable()
export class BcryptUtils {
	constructor(private readonly jwtService: JwtService) {}
	
	async hashPassword(password: string) {
		const hashedPassword = await hash(password, 10);
		return (hashedPassword);
	}

	async isValidPassword(password: string, hashedPassword: string) {
		const boolResponse = await compare(password, hashedPassword);
		return (boolResponse);
	}
	
	generateToken(payload: { userId: string }) {
		return (this.jwtService.sign(payload));
	}
}
