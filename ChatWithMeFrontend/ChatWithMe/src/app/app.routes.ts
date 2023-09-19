import { Route } from '@angular/router';
import { RoutesPath } from '@core/enums/routes-path.enum';
import { userAuthenticated, userNotAuthenticated } from '@core/guards/auth.guard';

export const routes: Route[] = [
  {
    path: RoutesPath.LOGIN,
    loadComponent: () => import('@components/landing-page/login/login.component').then(m => m.LoginComponent),
    canActivate: [userNotAuthenticated],
  },
  {
    path: RoutesPath.REGISTER,
    loadComponent: () => import('@components/landing-page/register/register.component').then(m => m.RegisterComponent),
    canActivate: [userNotAuthenticated],
  },
  {
    path: RoutesPath.HOME,
    loadComponent: () => import('@components/home/home.component').then(m => m.HomeComponent),
    canActivate: [userAuthenticated],
  },
  {
    path: '**',
    redirectTo: RoutesPath.LOGIN,
  },
];