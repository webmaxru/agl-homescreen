import {Component, OnInit, OnDestroy} from "@angular/core";
import {AglIdentityService} from "../../shared/aglIdentity.service";

@Component({
  selector: 'home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private account;
  private tmpAccount;
  private hidePopUp: boolean = true;

  constructor(private aglIdentityService: AglIdentityService) {
  }

  ngOnInit() {
    this.aglIdentityService.loginResponse.subscribe((response: any) => {
      let account = response.account;
      if (this.account) {
        this.tmpAccount = account;
        this.hidePopUp = false;
      } else {
        this.account = account;
      }
    });
    this.aglIdentityService.logoutResponse.subscribe(response=> {
      this.account = null;
    });
  }

  ngOnDestroy(): void {
    // this.aglIdentityService.loginResponse.unsubscribe();
    // this.aglIdentityService.logoutResponse.unsubscribe();
  }

  confirmLogin() {
    this.account = this.tmpAccount;
    this.hidePopUp = true;
  }

  cancelLogin() {
    this.hidePopUp = true;
  }

}