import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AuthInterceptorService } from "./auth/auth-intercepter.service";

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
})
export class CoreModule{}
/*
No need to export providers(services) because we are not declaring any

But still you have to import in app module
*/
