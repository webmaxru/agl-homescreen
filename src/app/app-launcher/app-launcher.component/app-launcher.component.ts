import { Component, OnInit, OnDestroy } from "@angular/core";
import { AfmMainService, App } from "../../shared/afmMain.service";
import { AglIdentityService } from "../../shared/aglIdentity.service";
import { environment } from "../../../environments/environment";

interface INotifier {
    show: boolean;
    title?: string;
    text?: string;
    timeout?: number;
}

@Component({
    selector: 'app-launcher',
    templateUrl: 'app-launcher.component.html',
    styleUrls: ['app-launcher.component.css']
})
export class AppLauncherComponent implements OnInit, OnDestroy {
    public apps: App[];
    public account;
    private tmpAccount;
    public hidePopUpLogin: boolean = true;
    public notifier: INotifier = { show: false };

    public token: string;

    constructor(private afmMainService: AfmMainService, private aglIdentityService: AglIdentityService) {
    }

    ngOnInit() {

        this.apps = [{
            id: 'forgerock',
            name: 'ForgeRock Identity',
            shortname: 'ForgeRock',
            version: '1',
            author: 'ForgeRock',
            description: 'ForgeRock',
            iconUrl: '/assets/apps/forgerock.png',
            extend: {
                isPressed: false
            },
            isRunning: false
        },{
            id: 'lufthansa',
            name: 'Lufthansa',
            shortname: 'Lufthansa',
            version: '1',
            author: 'Lufthansa',
            description: 'Lufthansa',
            iconUrl: '/assets/apps/lufthansa.png',
            extend: {
                isPressed: false
            },
            isRunning: false
        },{
            id: 'paypal',
            name: 'Paypal',
            shortname: 'Paypal',
            version: '1',
            author: 'Paypal',
            description: 'Paypal',
            iconUrl: '/assets/apps/paypal.png',
            extend: {
                isPressed: false
            },
            isRunning: false
        },{
            id: 'spotify',
            name: 'Spotify',
            shortname: 'Spotify',
            version: '1',
            author: 'Spotify',
            description: 'Spotify',
            iconUrl: '/assets/apps/spotify.png',
            extend: {
                isPressed: false
            },
            isRunning: false
        }]

    }

    ngOnDestroy(): void {
        // this.aglIdentityService.loginResponse.unsubscribe();
        // this.aglIdentityService.logoutResponse.unsubscribe();
    }

    runApp(event, app) {


/*         if (app.isRunning)
            this.afmMainService.stopApp(app);
        else
            this.afmMainService.startApp(app, "remote"); */
    }

    confirmPopup() {
        this.notifier.show = false;
    }

    confirmLogin() {
        this.account = this.tmpAccount;
        this.hidePopUpLogin = true;
    }

    cancelLogin() {
        this.hidePopUpLogin = true;
    }

    setDefaultIcon(app: App) {
        app.iconUrl = "./assets/svg/default-icon-app.svg";
        this.apps = this.afmMainService.update(app.id, app);
    }
}