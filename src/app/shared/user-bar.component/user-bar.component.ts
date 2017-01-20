import {Component, OnInit, Input} from "@angular/core";

@Component({
    selector: 'user-bar',
    templateUrl: 'user-bar.component.html',
    styleUrls: ['user-bar.component.css']
})
export class UserBarComponent implements OnInit {
    @Input() username: String;
    @Input() language: String;
    constructor() {}
    ngOnInit() {}
}
