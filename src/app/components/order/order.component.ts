import { Component } from '@angular/core';
import { map } from 'rxjs';
import { BaseService } from 'src/app/services/base.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {

  order: any;

  constructor(private base: BaseService) {
    this.base.getOrder().snapshotChanges().pipe(
      map(changes => changes.map(
        c => ({ key: c.payload.key, ...c.payload.val()}))
        )
    ).subscribe (adatok =>this.order=adatok)
  }

  deleteOrder(data:any){
    this.base.deleteOrder(data.key)
  }

  sendOrder() {
    this.base.orderComplete(this.order);

    this.order.forEach((orderItem: any) => {
        this.base.deleteOrder(orderItem.key);
    });
  }
}
