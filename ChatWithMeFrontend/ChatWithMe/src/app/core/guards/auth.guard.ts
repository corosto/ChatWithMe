import { inject } from "@angular/core";
import { Router } from '@angular/router';
import { RoutesPath } from "@core/enums/routes-path.enum";
import { UserService } from "@core/services/authorization/user.service";

export const userAuthenticated = () => {
  const authService = inject(UserService);
  const router = inject(Router);
  if (authService.isAuthenticated())
    return true;

  void router.navigateByUrl(RoutesPath.LOGIN);
};

export const userNotAuthenticated = () => {
  const authService = inject(UserService);
  const router = inject(Router);
  if (!authService.isAuthenticated())
    return true;

  void router.navigateByUrl(RoutesPath.HOME);
};