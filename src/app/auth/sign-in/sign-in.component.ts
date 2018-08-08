import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../../shared/alert/alert.service';
import { AuthenticationService } from '../../shared/_services';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup;
  returnUrl: string;
  validation_messages = {

    'Name': [
      { type: 'email', message: 'UserName is not valid.Enter proper Email Address' }
    ],
    'Password':[]
  }
  constructor(private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService) {
   
   }

  ngOnInit() {
    this.createForm();
     // reset login status
     this.authenticationService.logout();
      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  private createForm() {
    this.loginForm = new FormGroup({
      Name: new FormControl('', Validators.compose([
        Validators.email
      ])),
      Password: new FormControl('',[])
        
      
    });
  }
  
  //Handle create and update Category
  onloginFormSubmit(data:any) {
    if (this.loginForm.invalid) {
      return; //Validation failed, exit from method.
    }
    let FormValue = this.loginForm.value;
    this.authenticationService.login(FormValue.UserName, FormValue.Password)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.alertService.error(error);
                });
  }
}
