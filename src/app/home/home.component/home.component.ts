import {Component, OnInit, OnDestroy} from '@angular/core';
import {WebSocketHandler} from "../../shared/WebSocketHandler";
import {environment} from "../../../environments/environment";
import {AccountService} from "../../account/account.service";

@Component({
  selector: 'home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy, WebSocketHandler {
  private url: string = environment.service.api;
  private socket;
  private account;
  private tmpAccount;
  private hidePopUp: boolean = true;

  constructor(private accountService: AccountService) {
  }

  ngOnInit() {
    this.socket = new WebSocket(this.url);
    this.socket.onopen = this.onWSOpen.bind(this);
    this.socket.onclose = this.onWSClose.bind(this);
    this.socket.onmessage = this.onWSMessageReceive.bind(this);

    this.account = this.accountService.getAccount();
  }

  ngOnDestroy(): void {
    this.socket.close();
  }

  onWSOpen(): void {
    console.log("Home websocket is open");
  }

  onWSClose(): void {
    console.log("Home websocket is closed");
  }

  onWSMessageReceive(res): void {
    let response = JSON.parse(res.data);

    switch (response.type) {
      case "logged-in":
        // @todo agl-identity/login
        if (this.account) {
          this.tmpAccount = response.data.account;
          this.hidePopUp = false;
        } else {
          this.account = this.accountService.setAccount(response.data.account);
        }
        break;
      case "logged-out":
        // @todo agl-identity/logout
        this.account = this.accountService.setAccount(null);
        break;
      default:
        throw new Error("Unknown response type");
    }
  }

  confirmLogin() {
    this.account = this.accountService.setAccount(this.tmpAccount);
    this.hidePopUp = true;
  }

  cancelLogin() {
    this.hidePopUp = true;
  }
}