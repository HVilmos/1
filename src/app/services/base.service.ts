import { Injectable } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  dataRef:AngularFireList<any>;
  orderRef:AngularFireList<any>;
  orderCompletedRef:AngularFireList<any>;

  constructor(private db:AngularFireDatabase) {
    this.dataRef = this.db.list('/db')
    this.orderRef = this.db.list('/order')
    this.orderCompletedRef = this.db.list('/orderCompleted')

  }

  getData(){
    return this.dataRef
  }

  deleteData(key:any){
    return this.dataRef.remove(key)
  }

  addData(body:any){
    return this.dataRef.push(body)
  }

  updateData(key:any, newData:any){
    return this.dataRef.update(key, newData)
  }

  getOrder(){
    return this.orderRef
  }

  deleteOrder(key:any){
    return this.orderRef.remove(key)
  }

  addOrder(body:any){
    return this.orderRef.push(body)
  }

  orderComplete(body: any) {
    return this.orderCompletedRef.push(body);
}
  
}
