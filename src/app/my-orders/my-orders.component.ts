import { switchMap } from 'rxjs/operators';
import { AuthService } from './../auth.service';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit, OnDestroy {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  // Datatables
  dsOrders = new MatTableDataSource();
  displayedColumns: string[] = ['customer', 'date', 'view'];

  userId: string;
  subscription: Subscription;

  constructor(
    private auth: AuthService,
    private orderService: OrderService) {
    this.auth.user$.subscribe(user => this.userId = user.uid);
  }

  ngOnInit() {
    this.subscription = this.orderService.getOrdersByUser(this.userId).subscribe(orders => this.dsOrders.data = orders);
    this.dsOrders.paginator = this.paginator;
    this.dsOrders.sort = this.sort;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
