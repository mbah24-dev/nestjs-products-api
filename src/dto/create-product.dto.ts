/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   create-product.dto.ts                              :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/13 22:23:28 by mbah              #+#    #+#             */
/*   Updated: 2025/03/13 22:30:48 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  stock: number;
}
