import { Component, OnInit } from '@angular/core';
import {SpinnerService} from './spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  active = false;

  constructor(
    private spinnerService: SpinnerService
  ) { }

  ngOnInit(): void {
    this.spinnerService.active.subscribe( activ => {
      this.active = activ;
    });
  }

}
