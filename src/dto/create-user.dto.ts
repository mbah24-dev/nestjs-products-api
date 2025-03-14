/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   create-user.dto.ts                                 :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/13 02:08:27 by mbah              #+#    #+#             */
/*   Updated: 2025/03/13 02:19:08 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserDto {
	@IsString()
	@IsNotEmpty(
		{ 
			message: 'Le prénom ne peut pas être vide' 
		}
	)
	@MinLength(2, 
		{
			message: 'Le nom doit contenir au moins 2 caractères'
		}
	)
	fullname: string;

	@IsEmail(
		{},
		{
			message: 'L\'email fourni est invalide'
		}
	)
	email: string;

	@IsNotEmpty()
	@MinLength(8, 
		{
			message: 'Le mot de passe doit contenir au moins 8 caractères'
		}
	)
	password: string
}
