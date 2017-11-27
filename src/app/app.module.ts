import { NgModule } from "@angular/core";
import { HttpModule, Http } from "@angular/http";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FileUploadModule } from 'ng2-file-upload';
import { HeaderComponent, MenubarComponent, InfobarComponent } from "./shared/header.component/index";
import { AppLauncherComponent } from "./app-launcher/app-launcher.component/index";
import { AppManagerComponent } from "./app-manager/app-manager.component/index";
import { MultimediaComponent } from "./multimedia/multimedia.component/index";
import { HvacComponent } from "./hvac/hvac.component/hvac.component";
import { NavigationComponent } from "./navigation/navigation.component/navigation.component";
import { AuthService } from "./auth/auth.service/auth.service";
import { AuthGuard } from "./auth/auth.service/auth.guard";
import { LocationStrategy, HashLocationStrategy } from "@angular/common";
import { FooterComponent } from "./shared/footer.component/footer.component";
import { ConnectivityComponent } from "./connectivity/connectivity.component/connectivity.component";
import { HomeComponent } from "./home/home.component/home.component";
import { SettingsHomeComponent } from "./settings/settings-home/settings-home.component";
import { SettingsBluetoothComponent } from "./settings/settings-bluetooth/settings-bluetooth.component";
import { SettingsWifiComponent } from "./settings/settings-wifi/settings-wifi.component";
import { SettingsDatetimeComponent } from "./settings/settings-datetime/settings-datetime.component";
import { PopUpComponent } from "./shared/pop-up.component/pop-up.component";
import { EventEmitterComponent } from "./event-emitter/event-emitter.component/event-emitter.component";
import { UserBarComponent } from "./shared/user-bar.component/user-bar.component";
import { WebSocketService } from "./shared/websocket.service";
import { AfbContextService } from "./shared/afbContext.service";
import { AglIdentityService } from "./shared/aglIdentity.service";
import { AfmMainService } from "./shared/afmMain.service";
import { RemoveAppsPrefixPipe } from './remove-apps-prefix.pipe';
import { SafePipe } from './safe.pipe';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginModule } from './login/login.module';
import { SpotifyAppComponent } from './spotify-app/spotify-app.component';


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    FileUploadModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [HttpClient]
      }
  }),
  LoginModule
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PopUpComponent,
    MenubarComponent,
    InfobarComponent,
    AppLauncherComponent,
    AppManagerComponent,
    MultimediaComponent,
    HvacComponent,
    NavigationComponent,
    ConnectivityComponent,
    HomeComponent,
    SettingsHomeComponent,
    SettingsBluetoothComponent,
    SettingsWifiComponent,
    SettingsDatetimeComponent,
    EventEmitterComponent,
    UserBarComponent,
    RemoveAppsPrefixPipe,
    SafePipe,
    SpotifyAppComponent
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    AuthGuard,
    AuthService,
    WebSocketService,
    AfbContextService,
    AglIdentityService,
    AfmMainService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() { }
}
