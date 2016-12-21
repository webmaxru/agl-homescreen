import {Component, OnInit, OnDestroy} from "@angular/core";

@Component({
  selector: 'menubar',
  templateUrl: 'menubar.component.html',
  styleUrls: ['menubar.component.css']
})
export class MenubarComponent implements OnInit, OnDestroy {
  private apps = [
    {name: "Home"},
    {name: "Multimedia"},
    {name: "HVAC"},
    {name: "Navigation"}
  ];
  private selectedApp = "Home";

  constructor() {}
  ngOnInit() {}
  ngOnDestroy() {}

  selectApp(event, appName) {
    this.selectedApp = appName;
  }
}
