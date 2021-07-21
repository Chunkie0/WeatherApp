import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InputServiceService {

  private test = new BehaviorSubject(null);
  testShared = this.test.asObservable();

  constructor() { }

  changeElement(testElement: any[]){
    this.test.next(testElement)
  }
}
