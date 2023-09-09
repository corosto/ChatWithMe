import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { RoutesPath } from "@core/enums/routes-path.enum";
import { UserService } from "@core/services/authorization/user.service";
// import { ToastMessageService } from "@shared/components/toast-message/services/toast-message.service";
import { filter, map, tap } from "rxjs";
// import { SharedService } from '@shared/services/shared.service';

export const isUserLoggedInGuard = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  // const authService = inject(UserService);
  // const router = inject(Router);
  // if (authService.isAuthenticated())
  //   return true;

  // void router.navigateByUrl(`${RoutesPath.AUTHENTICATION}/${RoutesPath.LOGIN}`);
};

export const isUserNotLoggedInGuard = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  // const authService = inject(UserService);
  // const router = inject(Router);
  // if (!authService.isAuthenticated())
  //   return true;

  // void router.navigateByUrl(`${RoutesPath.HOME}/${RoutesPath.OFFERS}`);
};