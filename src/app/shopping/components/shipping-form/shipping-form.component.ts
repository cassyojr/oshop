import { ShoppingCart } from '../../../shared/models/shopping-cart';
import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Order } from '../../../shared/models/order';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { OrderService } from '../../../shared/services/order.service';
import { Shipping } from 'shared/models/shipping';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input('cart') cart: ShoppingCart;

  shipping: any = {};
  subscription: Subscription;
  userId: string;

  constructor(private authService: AuthService,
    private router: Router,
    private orderService: OrderService) { }

  ngOnInit() {
    this.subscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart);
    let result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key]);
  }
}
