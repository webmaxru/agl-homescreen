import {Component, OnInit, OnDestroy} from "@angular/core";
import {Router, NavigationEnd} from "@angular/router";
import {environment} from "../../../environments/environment";
import {WebSocketHandler} from "../../shared/WebSocketHandler";
import {AccountService} from "../../account/account.service";

@Component({
  selector: 'app-launcher',
  templateUrl: 'app-launcher.component.html',
  styleUrls: ['app-launcher.component.css']
})
export class AppLauncherComponent implements OnInit, OnDestroy, WebSocketHandler {
  private url: string = environment.service.api;
  private socket;
  private runnables;
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

    this.accountService.onAccountChanged.subscribe(account => {
      this.getRunnables();
    });
  }

  ngOnDestroy() {
    this.socket.close();
  }

  onWSOpen(): void {
    console.log("App launcher websocket is open");
    this.getRunnables();
  }

  onWSClose(): void {
    console.log("App launcher websocket is closed");
  }

  //@todo Add listeners to listen api-methods and implement your logic here
  onWSMessageReceive(res): void {
    let response = JSON.parse(res.data);

    switch (response.type) {
      case "runnables":
        // @todo  afm-main/runnables
        this.runnables = response.data.apps;
        break;
      case "start":
        // @todo afm-main/start
        let app = response.data.app;
        this.runnables.filter(r => r.id == app.id)[0].isRunning = app.isRunning;
        break;
      case "once":
        // @todo afm-main/once
        alert('App is already running');
        break;
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

  runApp(event, app) {
    this.socket.send(JSON.stringify({
      api: "afm-main/start",
      appId: app.id
    }));
  }

  confirmLogin() {
    this.account = this.accountService.setAccount(this.tmpAccount);
    this.hidePopUp = true;
  }

  cancelLogin() {
    this.hidePopUp = true;
  }

  private getRunnables() {
    this.socket.send(JSON.stringify({
      api: 'afm-main/runnables'
    }));
  }
}