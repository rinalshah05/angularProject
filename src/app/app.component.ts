import { Component } from '@angular/core';
import { AuthenticationService } from './shared/_services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 // isAuthenticated: boolean;
  title = 'app';
  // constructor(private authenticate: AuthenticationService){}
  // ngOnInit() {
  //   this.isAuthenticated = this.authenticate.isAuthenticated();
  // }
  
}
