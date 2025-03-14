import { Message } from './../../node_modules/esbuild/lib/main.d';
/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   signin-user.dto.ts                                 :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/13 20:27:15 by mbah              #+#    #+#             */
/*   Updated: 2025/03/13 20:28:28 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SigninUserDto {
	
	@IsEmail(
		{},
		{
			message: 'L\'email fourni est invalide'
		}
	)
	@IsNotEmpty()
	@IsString()
	email: string;

	@IsNotEmpty()
	@IsString()
	password: string;
}
