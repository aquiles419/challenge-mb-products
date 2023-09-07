import { ApiProperty } from '@nestjs/swagger';

export class ProductsDTO {
  id?: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description?: string | null;

  @ApiProperty()
  price: number;

  @ApiProperty()
  quantity: number;

  createdAt?: Date | string;

  updatedAt?: Date | string;
}
