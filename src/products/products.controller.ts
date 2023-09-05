import {
  Controller,
  Body,
  Post,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsDTO } from './products.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() data: ProductsDTO) {
    return this.productsService.create(data);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: ProductsDTO) {
    return this.productsService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.productsService.delete(id);
  }
}
