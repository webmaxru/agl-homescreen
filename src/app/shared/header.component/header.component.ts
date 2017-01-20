import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
  <infobar></infobar>
  <menubar></menubar>`,
  styles: [`
    :host {
      /*display: flex;*/
      height: 80px;
    }`]
})
export class HeaderComponent implements OnInit {
  constructor() {}
  ngOnInit() {}
}
