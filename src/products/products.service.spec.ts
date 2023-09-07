import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { AppModule } from '../app.module';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService],
      imports: [AppModule],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new product', async () => {
      const productData = {
        id: '1',
        name: 'test',
        description: 'teste_description',
        price: 0,
        quantity: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const createdProduct = await service.create(productData);

      expect(createdProduct).toHaveProperty('id');
      expect(createdProduct.name).toBe(productData.name);
    });
  });

  describe('findAll', () => {
    it('should return a list of products', async () => {
      const products = await service.findAll();

      expect(products).toBeDefined();
    });
  });

  describe('update', () => {
    it('should update a product', async () => {
      const productId = '1';
      const productData = {
        name: 'Updated Product',
        description: 'Updated Description',
        price: 20.0,
        quantity: 10,
      };

      const updatedProduct = await service.update(productId, productData);

      expect(updatedProduct.id).toBe(productId);
      expect(updatedProduct.name).toBe(productData.name);
    });

    it('should throw an error if the product does not exists', async () => {
      const productId = '1';
      const productData = {
        name: 'Updated Product',
        description: 'Updated Description',
        price: 20.0,
        quantity: 10,
      };

      jest
        .spyOn(service['prismaService'].products, 'findUnique')
        .mockResolvedValue(null);

      try {
        await service.update(productId, productData);
      } catch (error) {
        expect(error.message).toBe('Product does not exists!');
      }
    });
  });

  describe('delete', () => {
    it('should delete a product', async () => {
      const productId = '1';

      const deletedProduct = await service.delete(productId);

      expect(deletedProduct.id).toBe(productId);
    });

    it('should throw an error if the product does not exist', async () => {
      const productId = '1';

      jest
        .spyOn(service['prismaService'].products, 'findUnique')
        .mockResolvedValue(null);

      try {
        await service.delete(productId);
      } catch (error) {
        expect(error.message).toBe('Product does not exists!');
      }
    });
  });
});
