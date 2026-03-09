import { Component, input, output } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Product } from '../../../../core/models/product.model';

@Component({
  selector: 'app-product-card',
  imports: [CurrencyPipe],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  readonly product = input.required<Product>();
  readonly isHighlighted = input(false);

  readonly addToCart = output<Product>();
  readonly viewDetails = output<number>();

  onAddToCart(): void {
    this.addToCart.emit(this.product());
  }

  onViewDetails(): void {
    this.viewDetails.emit(this.product().id);
  }
}
