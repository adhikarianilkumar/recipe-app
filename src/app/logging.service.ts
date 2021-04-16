import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class LoggingService{
  lastLog: string;

  printLog(message: string){
    console.log(message);
    console.log(this.lastLog);
    this.lastLog = message;
  }
}

/**
 * This is for demo purpose
 * Service will have it's own instance when we load into any module
 * If you don't provide your service in app root or @injectable
 * this could cause bug especially during LAZYLOADING ( again it depends on where yiu load your services)
 */
