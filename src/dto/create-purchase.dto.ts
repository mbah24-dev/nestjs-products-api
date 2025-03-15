/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   create-purchase.dto.ts                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/14 22:03:20 by mbah              #+#    #+#             */
/*   Updated: 2025/03/14 23:22:53 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { IsInt, IsNotEmpty, IsString, Min } from "class-validator";

export class CreatePurchaseDto {
	@IsInt({ message: 'La quantité doit être un entier' })
    @Min(1, { message: 'La quantité doit être au moins 1' }) 
	quantity: number;
}