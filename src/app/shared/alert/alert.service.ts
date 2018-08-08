import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Alert, AlertType } from './alert';
import { Router, NavigationStart } from '@angular/router';
import 'rxjs/add/operator/filter';
@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private subject = new Subject<Alert>();
  private keepAfterRouteChange = false;
  constructor(private router: Router) {// clear alert messages on route change unless 'keepAfterRouteChange' flag is true
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterRouteChange) {
          // only keep for a single route change
          this.keepAfterRouteChange = false;
        } else {
          // clear alert messages
          this.clear();
        }
      }
    });
  }

  clear(alertId?: string) {
    this.subject.next(new Alert({ alertId }));
  }
   // subscribe to alerts
   getAlert(alertId?: string): Observable<any> {
    return this.subject.asObservable().filter((x: Alert) => x && x.alertId === alertId);
}

// convenience methods
success(message: string) {
    this.alert(new Alert({ message, type: AlertType.Success }));
}

error(message: string) {
    this.alert(new Alert({ message, type: AlertType.Error }));
}

info(message: string) {
    this.alert(new Alert({ message, type: AlertType.Info }));
}

warn(message: string) {
    this.alert(new Alert({ message, type: AlertType.Warning }));
}

// main alert method    
alert(alert: Alert) {
    this.keepAfterRouteChange = alert.keepAfterRouteChange;
    this.subject.next(alert);
}

}
