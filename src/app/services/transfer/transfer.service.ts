import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransferService {

  constructor() { }

  private dataSource = new Subject<any>();
  data$ = this.dataSource.asObservable();

  sendData(data: any){
    
    this.dataSource.next(data);
    console.log(this.dataSource.next(data))
  }
  receiveData(){
    return this.dataSource.next();
  }
}
