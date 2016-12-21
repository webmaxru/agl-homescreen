import {Component, OnInit, OnDestroy} from "@angular/core";
import {Router, NavigationEnd} from "@angular/router";
import {environment} from "../../../environments/environment";
import * as io from "socket.io-client";

@Component({
    selector: 'app-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
    private connection;
    private url: string = environment.service.api;
    private socket;
    private runnables;
    private account;

    constructor(private router: Router) {
        this.socket = io.connect(this.url);
    }

    //@todo Add listeners to listen api-methods and implement your logic here
    ngOnInit() {
        this.router.events.subscribe((event: any) => {
            if(event instanceof NavigationEnd) {
                switch (event.url) {
                    case '/car-login':
                        this.triggerLogin();
                        break;
                    case '/car-logout':
                        this.triggerLogout();
                        break;
                    default:
                        break;
                }
            }
        });

        this.socket.emit("send-runnables");

        this.connection = this.socket.on("new-runnables", res => {
            // @todo  afm-main/runnables
            let apps = res.data.apps;
            this.runnables = apps;
        });

        this.connection = this.socket.on("app-started", res => {
            // @todo afm-main/start
            let app = res.data.app;
            this.runnables.filter(r => r.id == app.id)[0].isRunning = app.isRunning;
        });


        this.connection = this.socket.on("app-once", res => {
            // @todo afm-main/once
            alert('App is already running');
        });

        this.connection = this.socket.on("logged-in", res => {
            // @todo agl-identity/login
            let account = res.data.account;
            this.account = account;
        });

        this.connection = this.socket.on("logout-out", res => {
            // @todo agl-identity/login
            this.account = null;
        });
    }

    ngOnDestroy() {
        this.socket.disconnect();
    }

    runApp(event, app) {
        this.socket.emit("launch-app", {id: app.id});
    }

    private triggerLogin() {
        this.socket.emit("login", {
            id: 'someAccountId'
        });
    }

    private triggerLogout() {
        this.socket.emit("logout");
    }
}
