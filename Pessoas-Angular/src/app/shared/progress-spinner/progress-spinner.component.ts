import { Component, OnInit} from '@angular/core';
import { ProgressSpinnerService} from './progress-spinner.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-progress-spinner',
  templateUrl: './progress-spinner.component.html',
  styleUrls: ['./progress-spinner.component.css']
})

export class ProgressSpinnerComponent implements OnInit {

  public isLoading: Subject<boolean> = this.progressSpinerService.isLoading;

  constructor(
    private readonly progressSpinerService: ProgressSpinnerService
  ) {
  }

  ngOnInit(): void {
  }

}
