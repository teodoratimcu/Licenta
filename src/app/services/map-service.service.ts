import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: "root" })
export class DataTransferService {
  products = new BehaviorSubject<any>([]);
  cast = this.products.asObservable();

  sendAnything(data) {
    this.products.next(data);
  }
}
