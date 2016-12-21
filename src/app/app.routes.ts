import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from './home/home.component/index';
import {MultimediaComponent} from './multimedia/multimedia.component/index';
import {HvacComponent} from "./hvac/hvac.component/hvac.component";
import {NavigationComponent} from "./navigation/navigation.component/navigation.component";
import {AuthGuard} from "./auth/auth.service/auth.guard";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LoginComponent},
  {path: 'multimedia', component: MultimediaComponent, canActivate: [AuthGuard]},
  {path: 'hvac', component: HvacComponent, canActivate: [AuthGuard]},
  {path: 'navigation', component: NavigationComponent, canActivate: [AuthGuard]},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'car-login', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'car-logout', component: HomeComponent, canActivate: [AuthGuard]},
  {path: '**', component: HomeComponent, canActivate: [AuthGuard]}

  // {
  //   path: 'heroes',
  //   component: HeroListComponent,
  //   data: {
  //     title: 'Heroes List'
  //   }
  // },
  // { path: 'hero/:id', component: HeroDetailComponent },
];

export const appRouteProviders: any[] = [];

export const appRoutes = RouterModule.forRoot(routes);