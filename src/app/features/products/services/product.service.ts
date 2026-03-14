import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../../../core/models/product.model';
import { ApiService } from '../../../core/services/api.service';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private api = inject(ApiService);

  getAll(): Observable<Product[]> {
    return this.api.get<Product[]>('/products');
  }

  getById(id: number): Observable<Product> {
    return this.api.get<Product>(`/products/${id}`);
  }

  create(product: Partial<Product>): Observable<Product> {
    return this.api.post<Product>('/products', product);
  }

  update(id: number, product: Partial<Product>): Observable<Product> {
    return this.api.put<Product>(`/products/${id}`, product);
  }

  delete(id: number): Observable<void> {
    return this.api.delete<void>(`/products/${id}`);
  }

  /** Mock data for exercises (no backend needed) */
  getMockProducts(): Observable<Product[]> {
    return of([
      {
        id: 1,
        name: 'Laptop',
        description: 'High-performance laptop',
        price: 999,
        imageUrl: 'https://via.placeholder.com/200',
        category: 'Electronics',
        inStock: true,
      },
      {
        id: 2,
        name: 'Headphones',
        description: 'Noise-cancelling headphones',
        price: 199,
        imageUrl: 'https://via.placeholder.com/200',
        category: 'Electronics',
        inStock: true,
      },
      {
        id: 3,
        name: 'Backpack',
        description: 'Durable travel backpack',
        price: 79,
        imageUrl: 'https://via.placeholder.com/200',
        category: 'Accessories',
        inStock: false,
      },
      {
        id: 4,
        name: 'Keyboard',
        description: 'Mechanical gaming keyboard',
        price: 149,
        imageUrl: 'https://via.placeholder.com/200',
        category: 'Electronics',
        inStock: true,
      },
      {
        id: 5,
        name: 'Mouse',
        description: 'Wireless ergonomic mouse',
        price: 59,
        imageUrl: 'https://via.placeholder.com/200',
        category: 'Electronics',
        inStock: true,
      },
    ]);
  }
}
