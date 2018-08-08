import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModalOptions } from './modalOptions';
declare let $: any;
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  @Input()
  options: ModalOptions;

  @Output()
  change: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }
  primaryButtonAction(): void {
    $('#' + this.options.id).modal('hide');
    this.change.emit(this.options);
  }

}
