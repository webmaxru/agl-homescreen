import {Component, OnInit, OnDestroy} from "@angular/core";
import {TranslateService} from "ng2-translate";
import {WebSocketHandler} from "./shared/WebSocketHandler";
import {environment} from "../environments/environment";
import {AccountService} from "./account/account.service";

@Component({
  selector: 'app',
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent implements OnInit, OnDestroy, WebSocketHandler {
  private url: string = environment.service.api;
  private socket;
  private defaultLanguage: string = 'en';

  constructor(private accountService: AccountService, private translate: TranslateService) {
  }

  ngOnInit() {
    this.socket = new WebSocket(this.url);
    this.socket.onopen = this.onWSOpen.bind(this);
    this.socket.onclose = this.onWSClose.bind(this);
    this.socket.onmessage = this.onWSMessageReceive.bind(this);

    this.translate.addLangs(["en", "fr"]);
    this.translate.setDefaultLang(this.defaultLanguage);

    let browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang.match(/en|fr/) ? browserLang : this.defaultLanguage);
  }

  ngOnDestroy(): void {
    this.socket.close();
  }

  onWSOpen(): void {
    console.log("App websocket is open");
  }

  onWSClose(): void {
    console.log("App websocket is closed");
  }

  onWSMessageReceive(res): void {
    let response = JSON.parse(res.data);
    let account: any;

    switch (response.type) {
      case "logged-in":
        // @todo agl-identity/login
        account = response.data.account;
        this.accountService.setAccount(account);
        if (account.language === "ENG") {
          this.translate.use('en');
        } else if (account.language === "FRA") {
          this.translate.use('fr');
        }
        break;
      case "logged-out":
        // @todo agl-identity/logout
        this.translate.use(this.defaultLanguage);
        break;
      default:
        throw new Error("Unknown response type");
    }
  }
}