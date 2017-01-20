import {Injectable, EventEmitter, Output} from '@angular/core';

@Injectable()
export class AccountService {
  private account;
  @Output() onAccountChanged = new EventEmitter();

  constructor() {
  }

  public getAccount() {
    return this.account;
  }

  public setAccount(account) {
    this.account = account;
    this.onAccountChanged.emit(account);
    return this.account;
  }
}