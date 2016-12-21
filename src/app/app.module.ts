import {NgModule} from "@angular/core";
import {HttpModule} from "@angular/http";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {AppComponent, appRoutes, appRouteProviders} from "./index";
import {LoginModule} from "./login/login.module";
import {HeaderComponent, MenubarComponent, InfobarComponent} from "./shared/header.component/index";
import {HomeComponent} from "./home/home.component/index";
import {MultimediaComponent} from "./multimedia/multimedia.component/index";
import {HvacComponent} from "./hvac/hvac.component/hvac.component";
import {NavigationComponent} from "./navigation/navigation.component/navigation.component";
import {AuthService} from "./auth/auth.service/auth.service";
import {AuthGuard} from "./auth/auth.service/auth.guard";
import {LocationStrategy, HashLocationStrategy} from "@angular/common";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    LoginModule,
    appRoutes,
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    MenubarComponent,
    InfobarComponent,
    HomeComponent,
    MultimediaComponent,
    HvacComponent,
    NavigationComponent
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    appRouteProviders,
    AuthGuard,
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {}
}
