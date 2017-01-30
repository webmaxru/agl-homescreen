import {Component, OnInit, OnDestroy} from "@angular/core";
import {AfmMainService} from "../../shared/afmMain.service";
import {AglIdentityService} from "../../shared/aglIdentity.service";

@Component({
  selector: 'app-launcher',
  templateUrl: 'app-launcher.component.html',
  styleUrls: ['app-launcher.component.css']
})
export class AppLauncherComponent implements OnInit, OnDestroy {
  private runnables;
  private account;
  private tmpAccount;
  private hidePopUp: boolean = true;

  constructor(private afmMainService: AfmMainService, private aglIdentityService: AglIdentityService) {
  }

  ngOnInit() {
    this.afmMainService.runnablesResponse.subscribe((response: any) => {
      this.runnables = response.apps;
    });

    this.afmMainService.onesResponse.subscribe((response: any) => {
      alert('App is already running');
    });

    this.afmMainService.startAppResponse.subscribe((response: any) => {
      let app = response.app;
      this.runnables.filter(r => r.id == app.id)[0].isRunning = app.isRunning;
    });

    this.aglIdentityService.loginResponse.subscribe((response: any) => {
      if (this.account) {
        this.tmpAccount = response.account;
        this.hidePopUp = false;
      } else {
        this.afmMainService.getRunnables();
      }
    });

    this.aglIdentityService.logoutResponse.subscribe(data => {
      this.account = null;
    });

    this.afmMainService.getRunnables();
  }

  ngOnDestroy(): void {
    // this.aglIdentityService.loginResponse.unsubscribe();
    // this.aglIdentityService.logoutResponse.unsubscribe();
  }

  runApp(event, app) {
    this.afmMainService.startApp(app);
  }

  confirmLogin() {
    this.account = this.tmpAccount;
    this.hidePopUp = true;
  }

  cancelLogin() {
    this.hidePopUp = true;
  }
}