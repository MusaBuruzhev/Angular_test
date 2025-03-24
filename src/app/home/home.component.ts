import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { ProductsService } from '../service/product.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true, 
  imports: [CommonModule, FormsModule], 
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  products: any[] = []; 
  filterProducts: any[] = [];
  basket: any[] = [];
  productName = ""; 
  productPrice = ""; 
  productImage = "https://basket-05.wbbasket.ru/vol871/part87171/87171615/images/big/1.webp";
  error = ""; 

  constructor(private _productService: ProductsService) {}
  
  async ngOnInit() {
    this.products = await this._productService.getProducts();
    this.products = this.products.map(product => ({ ...product, isAdded: false })); 
    this.filterProducts = this.products; 
    console.log(this.products); 
  }

  search(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const searchText = inputElement?.value.toLowerCase();
    
    if (searchText) {
      this.filterProducts = this.products.filter((product: any) => 
        product.description.toLowerCase().includes(searchText)
      );
    } else {
      this.filterProducts = this.products;
    }
    console.log(this.filterProducts);
  }

  addProductBasket(product: any) {
    product.isAdded = true; 
    this._productService.addProductBasket(product); 
  }

  addProduct() {
    if (this.productName && this.productPrice) {
      let newProduct = {
        id: Date.now(), 
        description: this.productName, 
        price: this.productPrice, 
        image: this.productImage, 
        isAdded: false 
      };

      this.products.unshift(newProduct); 
      this.filterProducts = this.products; 
      this.productName = ""; 
      this.productPrice = ""; 
      this.productImage = "https://basket-05.wbbasket.ru/vol871/part87171/87171615/images/big/1.webp";
      this.error = ""; 
    } else {
      this.error = "Нужно заполнить все поля"; 
    }
  }
}