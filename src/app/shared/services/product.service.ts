import { Product } from 'shared/models/product';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product) {
    return this.db.list('/products').push(product);
  }

  getAll() {
    return this.db
      .list('/products')
      .snapshotChanges()
      .pipe(map(actions => actions.map<Product>(a => {
        return <Product>{
          key: a.key,
          title: a.payload.child('title').val(),
          category: a.payload.child('category').val(),
          imageUrl: a.payload.child('imageUrl').val(),
          price: a.payload.child('price').val()
        }
      })));
  }

  get(productId): Observable<Product> {
    return this.db
      .object('/products/' + productId)
      .valueChanges()
      .pipe(map((p: Product) =>
        <Product>{
          category: p.category,
          title: p.title,
          price: p.price,
          imageUrl: p.imageUrl
        }));
  }

  update(productId, product) {
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId) {
    return this.db.object('/products/' + productId).remove();
  }
}
