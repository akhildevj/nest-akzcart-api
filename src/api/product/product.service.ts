import { Injectable } from '@nestjs/common';
import {
  MessageDto,
  ProductBodyDto,
  ProductDto,
  ProductIdDto,
} from './dto/product.dto';

let products: ProductDto[] = [];

const DELETE_MESSAGE = 'Succesfully deleted';
const ADD_MESSAGE = 'Succesfully added';

@Injectable()
export class ProductService {
  getProducts(): ProductDto[] {
    return products;
  }

  getProductDetails(params: ProductIdDto): ProductDto {
    const { id } = params;
    const [product] = products.filter(product => product.id === id);
    return product;
  }

  addProduct(body: ProductBodyDto): MessageDto {
    products.push({ id: body.name.toLowerCase(), ...body });
    return { success: true, message: ADD_MESSAGE };
  }

  removeProduct(params: ProductIdDto): MessageDto {
    const { id } = params;
    products = products.filter(product => product.id !== id);
    return { success: true, message: DELETE_MESSAGE };
  }
}
