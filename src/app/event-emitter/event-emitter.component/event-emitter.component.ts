import {Component, OnInit, OnDestroy} from '@angular/core';
import {environment} from "../../../environments/environment";
import {AglIdentityService} from "../../shared/aglIdentity.service";

@Component({
  selector: 'event-emitter',
  templateUrl: 'event-emitter.component.html',
  styleUrls: ['event-emitter.component.css']
})
export class EventEmitterComponent implements OnInit, OnDestroy {
  // private url: string = environment.service.api;
  // private socket;
  private name: string;
  private language: string = "";

  constructor(private aglIdentityService: AglIdentityService) {
  }

  ngOnInit() {
    // this.socket = new WebSocket(this.url);
  }

  ngOnDestroy(): void {
    // this.socket.close();
  }

  triggerLogin() {
    this.aglIdentityService.login(this.name, this.language);
  }

  triggerLogout() {
    this.aglIdentityService.logout();
  }
}