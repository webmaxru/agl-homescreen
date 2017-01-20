import {Component, OnInit} from '@angular/core';
import {AccountService} from "../../account/account.service";

@Component({
  selector: 'app-footer',
  templateUrl: 'footer.component.html',
  styleUrls: ['footer.component.css']
})
export class FooterComponent implements OnInit {
  private account;

  constructor(private accountService: AccountService) {
    accountService.onAccountChanged.subscribe(account => this.account = account);
  }

  ngOnInit() {
    this.account = this.accountService.getAccount();
  }
}
