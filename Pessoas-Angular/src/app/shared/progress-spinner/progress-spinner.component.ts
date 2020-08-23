import { Component, OnInit, Injectable } from '@angular/core';

@Component({
  selector: 'app-progress-spinner',
  templateUrl: './progress-spinner.component.html',
  styleUrls: ['./progress-spinner.component.css']
})
@Injectable()
export class ProgressSpinnerComponent implements OnInit {

  public visible: boolean;

  constructor() {
    this.visible = false;
  }

  public getVisible(): void {
    if (this.visible){
       this.visible = false;
    } else {
     this.visible = true;
   }
  }

  ngOnInit(): void {
  }

}
