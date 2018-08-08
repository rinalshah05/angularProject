import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
 //Create form
 sidebarForm = new FormGroup({
  //title: new FormControl('', Validators.required),
  //category: new FormControl('', Validators.required)
});
  constructor() { }

  ngOnInit() {
  }

}
