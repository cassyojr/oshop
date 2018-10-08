import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { Component, OnInit, ViewChild, OnDestroy, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  private paginator: MatPaginator;
  private sort: MatSort;

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  // Datatables
  dsProducts = new MatTableDataSource([]);
  displayedColumns: string[] = ['thumbnail', 'title', 'quantity', 'price'];

  subscription: Subscription;
  cart$;

  constructor(private shoppingCartService: ShoppingCartService) { }

  setDataSourceAttributes() {
    this.dsProducts.paginator = this.paginator;
    this.dsProducts.sort = this.sort;
  }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart().then();
    this.subscription = this.cart$.subscribe(products => this.dsProducts.data = products.items);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  clearCart() {
    this.shoppingCartService.clearCart();
  }
}
