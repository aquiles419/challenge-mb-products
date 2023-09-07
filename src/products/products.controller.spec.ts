import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { AppModule } from '../app.module';

describe('ProductsController', () => {
  let controller: ProductsController;
  let productsService: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [ProductsService],
      imports: [AppModule],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    productsService = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create Products', () => {
    it('should create a product', async () => {
      const productData = {
        id: '1',
        name: 'test',
        description: 'teste_description',
        price: 0,
        quantity: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(productsService, 'create').mockResolvedValue(productData);

      const result = await controller.create(productData);

      expect(result).toEqual(productData);
    });
  });

  describe('findAll Products', () => {
    it('should return an array of products', async () => {
      const productsList = [
        {
          id: '1',
          name: 'test',
          description: 'teste_description',
          price: 0,
          quantity: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          name: 'test2',
          description: 'teste_description2',
          price: 1,
          quantity: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      jest.spyOn(productsService, 'findAll').mockResolvedValue(productsList);

      const result = await controller.findAll();

      expect(result).toEqual(productsList);
    });
  });

  describe('update Prodduct', () => {
    it('should update a product', async () => {
      const productId = '1'; // Defina o ID do produto a ser atualizado.
      const updatedProductData = {
        name: 'updated_name',
        description: 'updated_description',
        price: 3,
        quantity: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const updatedProduct = {
        id: productId,
        ...updatedProductData,
      };

      jest.spyOn(productsService, 'update').mockResolvedValue(updatedProduct);

      const result = await controller.update(productId, updatedProductData);

      expect(result).toEqual(updatedProduct);
    });
  });

  describe('delete Product', () => {
    it('should delete a product', async () => {
      const productId = '1';
      jest.spyOn(productsService, 'delete').mockResolvedValue(productId);

      const result = await controller.delete(productId);

      expect(result).toEqual(productId);
    });
  });
});
