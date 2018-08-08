import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../../shared/_services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  //Create form
  headerForm = new FormGroup({
    search: new FormControl('', Validators.required),
    //category: new FormControl('', Validators.required)
  });
  isAuthenticated: boolean;
  constructor(private authenticate: AuthenticationService) { }

  ngOnInit() {
    this.isAuthenticated = this.authenticate.isAuthenticated();
  }

}
