import { Route } from '@angular/router';
import { RoutesPath } from '@core/enums/routes-path.enum';
import { isUserLoggedInGuard, isUserNotLoggedInGuard } from '@core/guards/auth.guard';

export const routes: Route[] = [
  {
    path: '',
    loadComponent: () => import('@components/landing-page/landing-page.component').then(m => m.LandingPageComponent),
    // canActivate: [isUserLoggedInGuard], //nowy guard
  },

  {
    path: RoutesPath.HOME,
    loadComponent: () => import('@components/home/home.component').then(m => m.HomeComponent),
    canActivate: [isUserLoggedInGuard],
    canDeactivate: [isUserNotLoggedInGuard],
  },
  {
    path: '**',
    redirectTo: '',
  },
];



//TODO logowanie przez dialog z możliwością logowania przez fb lub google
// czy robić transloco?

//dla niewłaściwej ścieżki -> redirect do landing page, i w jego guardzie sprawdzane czy jest użytkownik zalogowany, 
//jak tak to przekierowanie do home a jak nie to landing page