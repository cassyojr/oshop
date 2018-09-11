import { ProductService } from './../../product.service';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../../models/product';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  products: Product[];
  filteredProducts: Product[];
  subscription: Subscription;

  // Datatable
  displayedColumns: string[] = ['title', 'price', 'edit'];
  dsProducts = new MatTableDataSource();

  constructor(private productService: ProductService) {
    this.subscription = this.productService
      .getAll()
      .subscribe(products => {
        this.dsProducts.data = this.filteredProducts = this.products = products.map(
          product => {
            return <Product>{
              key: product['key'],
              title: product.obj['title'],
              category: product.obj['category'],
              imageUrl: product.obj['imageUrl'],
              price: product.obj['price']
            }
          }
        )
      });
  }

  filter(query: string) {
    let innerQuery = query.trim().toLowerCase();
    this.dsProducts.data = this.filteredProducts = query ?
      this.products.filter(p => p.title.toLowerCase().includes(innerQuery)) :
      this.products;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.dsProducts.paginator = this.paginator;
    this.dsProducts.sort = this.sort;
  }

}
