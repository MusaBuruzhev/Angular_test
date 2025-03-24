import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-basket',
  templateUrl: './bascket.component.html',
  styleUrls: ['./bascket.component.scss']
})
export class BasketComponent implements OnInit {
  basket: any[] = []; 

  ngOnInit(): void {
    this.loadBasket(); 
  }

  
  loadBasket(): void {
    const basketData = localStorage.getItem('basket');
    if (basketData) {
      this.basket = JSON.parse(basketData);
    }
  }

  
  removeFromBasket(product: any): void {
    
    this.basket = this.basket.filter((item) => item.id !== product.id);

    
    localStorage.setItem('basket', JSON.stringify(this.basket));

    
    this.loadBasket();
  }

  
  getBasket(): string {
    return `Товаров в корзине: ${this.basket.length}`;
  }
}