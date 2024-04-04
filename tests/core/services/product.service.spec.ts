import {TestBed} from '@angular/core/testing';
import {ProductDto, ProductService} from "../../../src/app/core/services/product.service";
import {HttpClientModule} from "@angular/common/http";


const mockProduct: ProductDto = {
  id: '9999',
  name: 'Product 1',
  description: 'Description 1',
  logo: 'logo',
  date_release: '2022-01-01',
  date_revision: '2022-01-01'
}

describe('Product Service', () => {
  let productService: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    productService = TestBed.inject(ProductService);
  });

  beforeEach(async () => {
    try {
      await productService.deleteProduct(mockProduct.id).toPromise();
    } catch (error) {
    }
  });

  test('should be created', () => {
    expect(productService).toBeTruthy();
  });

  test('should get products', (done) => {
    productService.getProducts().subscribe(products => {
      expect(Array.isArray(products)).toBeTruthy();
      done()
    });
  });

  test('should add new product', (done) => {
    productService.addProduct(mockProduct).subscribe(product => {
      expect(product.id).toBe(mockProduct.id)
      done();
    });
  });
  test('should update existing product', (done) => {
    productService.addProduct(mockProduct).subscribe(product => {
      const productToUpdate: ProductDto = {...product, name: 'UPDATED'};

      productService.updateProduct(productToUpdate).subscribe(updated => {
        expect(updated.name).not.toBe(mockProduct.name);
        done();
      });
    });
  });

  test('should verify existing ID', (done) => {
    productService.addProduct(mockProduct).subscribe(product => {
      productService.verifyExistingID(mockProduct.id).subscribe(exists => {
        expect(exists).toBeTruthy();
        done();
      });
    });
  });

});
