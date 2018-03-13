import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BaseCarInfo } from '../models/base-car-info';

@Injectable()
export class CommunicationService {

  private infoToShare = new Subject<BaseCarInfo[]>();
  private isUpdatedProfile = new Subject<boolean>();
  public infoReceived = this.infoToShare.asObservable();
  public isUpdatedReceived = this.isUpdatedProfile.asObservable();

  constructor() { }

  sendBaseCarInfo(info: BaseCarInfo[]) {
    this.infoToShare.next(info);
  }

  getNotifiedOfNewBaseCarInfoSent(array: BaseCarInfo[]) {
    this.infoToShare.subscribe(data => array = data);
  }

  sendUpdatedProfile(isUpdated: boolean) {
    this.isUpdatedProfile.next(isUpdated);
  }

  getNotifiedEditedProfile(isUpdated: boolean) {
    this.isUpdatedProfile.subscribe(data => isUpdated = data);
  }
}
