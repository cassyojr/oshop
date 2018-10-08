import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { ShoppingCartService } from './shopping-cart.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private db: AngularFireDatabase,
    private shoppingCartService: ShoppingCartService) { }

  async placeOrder(order) {
    let result = await this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return result;
  }

  getOrders() {
    return this.db.list('/orders').snapshotChanges()
      .pipe(map(actions => actions.map(a => ({ key: a.key, obj: a.payload.val() }))));
  }

  getOrdersByUser(userId: string) {
    return this.db
      .list('/orders', query => query.orderByChild('userId').equalTo(userId))
      .snapshotChanges()
      .pipe(map(actions => actions.map(a => ({ key: a.key, obj: a.payload.val() }))));
  }

}
