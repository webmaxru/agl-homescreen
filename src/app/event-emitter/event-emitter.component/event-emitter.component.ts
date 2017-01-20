import {Component, OnInit, OnDestroy} from '@angular/core';
import {environment} from "../../../environments/environment";

@Component({
  selector: 'event-emitter',
  templateUrl: 'event-emitter.component.html',
  styleUrls: ['event-emitter.component.css']
})
export class EventEmitterComponent implements OnInit, OnDestroy {
  private url: string = environment.service.api;
  private socket;
  private name: string;
  private language: string = "";

  constructor() {
  }

  ngOnInit() {
    this.socket = new WebSocket(this.url);
  }

  ngOnDestroy(): void {
    this.socket.close();
  }

  triggerLogin() {
    this.socket.send(JSON.stringify({
      api: "agl-identity/login",
      data: {
        username: this.name,
        language: this.language
      }
    }));
  }

  triggerLogout() {
    this.socket.send(JSON.stringify({
      api: "agl-identity/logout",
      data: {
        accountId: 'someAccountId'
      }
    }));
  }
}