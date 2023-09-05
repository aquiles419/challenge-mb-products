import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { ProductsDTO } from './products.dto';

@Injectable()
export class ProductsService {
  constructor(private prismaService: PrismaService) {}

  async create(data: ProductsDTO) {
    const productExists = await this.prismaService.products.findFirst({
      where: {
        name: data.name,
      },
    });

    if (productExists) {
      throw new Error('Product already exists');
    }

    const product = await this.prismaService.products.create({
      data,
    });

    return product;
  }

  async findAll() {
    return this.prismaService.products.findMany();
  }

  async update(id: string, data: ProductsDTO) {
    const productExists = await this.prismaService.products.findUnique({
      where: {
        id,
      },
    });

    if (!productExists) {
      throw new Error('Product does not exists!');
    }

    return await this.prismaService.products.update({
      data,
      where: {
        id,
      },
    });
  }

  async delete(id: string) {
    const productExists = await this.prismaService.products.findUnique({
      where: {
        id,
      },
    });

    if (!productExists) {
      throw new Error('Product does not exists!');
    }

    return await this.prismaService.products.delete({
      where: {
        id,
      },
    });
  }
}
