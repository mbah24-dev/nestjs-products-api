/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   create-product.dto.ts                              :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/13 22:23:28 by mbah              #+#    #+#             */
/*   Updated: 2025/03/15 21:35:13 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { IsInt, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateProductDto {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsInt()
  @Min(1)
  stock: number;

  @IsString()
  @IsNotEmpty()
  @Min(5)
  description: string;

  @IsString()
  @IsNotEmpty()
  @Min(2)
  category: string;
  
}
