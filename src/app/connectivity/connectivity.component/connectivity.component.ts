import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'connectivity',
    templateUrl: 'connectivity.component.html',
    styleUrls: ['connectivity.component.css']
})
export class ConnectivityComponent implements OnInit {

    url = 'https://www.automotivelinux.org/'
    
    constructor() {}
    ngOnInit() {}
}