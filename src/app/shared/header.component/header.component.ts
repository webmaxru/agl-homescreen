import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
  <menubar></menubar>
  <infobar></infobar>`,
  styles: [`
    :host {
      display: inline-flex;
      height: 90px;
    }`]
})
export class HeaderComponent implements OnInit {
  constructor() {}
  ngOnInit() {}
}
