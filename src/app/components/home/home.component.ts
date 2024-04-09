import { Component } from '@angular/core';
import { map } from 'rxjs';
import { BaseService } from 'src/app/services/base.service';

interface Card {
  key: string;
  name: string;
  price: number;
  quantity:number
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {

  cards: Card[] = [];
  cardsForm={name:"",price:""}
  searchTerm: string = "";


  constructor(private base:BaseService){
    this.base.getData().snapshotChanges().pipe(
      map(changes => changes.map(
        c => ({key: c.payload.key, ...c.payload.val()})
      ))
    ).subscribe(adatok => this.cards = adatok)
  }

  add(){
    this.base.addData(this.cardsForm);
    this.cardsForm= {name:'', price:''}
  }

  delete(data:any){
    this.base.deleteData(data.key)
  }
  

  update(data:any){
    const newData = {name: data.name, price: data.price};
    this.base.updateData(data.key, newData)
  }

  addOrder(card: Card) {
    const orderData = { name: card.name, price: card.price, quantity: card.quantity };
    this.base.addOrder(orderData);
  }

  

}
