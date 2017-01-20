import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Observable} from "rxjs";

@Component({
  selector: 'pop-up',
  templateUrl: 'pop-up.component.html',
  styleUrls: ['pop-up.component.css']
})

export class PopUpComponent implements OnInit {
  @Output() onConfirm = new EventEmitter();
  @Output() onCancel = new EventEmitter();
  private givenTime: number = 30000;
  private timeLeft: number = this.givenTime;

  constructor() {
  }

  ngOnInit() {
    let timer = Observable.timer(this.givenTime);
    let timerSub = timer.subscribe(t => {
      this.cancel();
      timerSub.unsubscribe();
    });

    let timeLeftTimer = Observable.timer(0, 1000);
    let timerLeftSub = timeLeftTimer.subscribe(t => {
      this.timeLeft = (this.givenTime - t * 1000) / 1000;
      if (this.timeLeft === 0) {
        timerLeftSub.unsubscribe();
      }
    });
  }

  cancel() {
    this.onCancel.emit();
  }

  confirm() {
    this.onConfirm.emit();
  }
}