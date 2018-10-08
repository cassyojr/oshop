import { OrderService } from '../../../shared/services/order.service';
import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit, OnDestroy {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  // Datatables
  dsOrders = new MatTableDataSource();
  displayedColumns: string[] = ['customer', 'date', 'view'];

  subscription: Subscription;

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.subscription = this.orderService.getOrders().subscribe(orders => this.dsOrders.data = orders);
    this.dsOrders.paginator = this.paginator;
    this.dsOrders.sort = this.sort;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
