import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BaseCarInfo } from '../models/base-car-info';

@Injectable()
export class CommunicationService {

private infoToShare = new Subject<BaseCarInfo[]>();
public infoReceived = this.infoToShare.asObservable();

  constructor() { }

  sendBaseCarInfo(info: BaseCarInfo[]) {
    this.infoToShare.next(info);
  }

  getNotifiedOfNewBaseCarInfoSent(array: BaseCarInfo[]) {
    this.infoToShare.subscribe(data => array = data);
  }

}
