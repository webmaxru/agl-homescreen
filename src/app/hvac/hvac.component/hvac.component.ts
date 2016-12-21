import {Component, OnInit, OnDestroy} from "@angular/core";
import {Speed} from "../modeles/speed.model";
import {Mileage} from "../modeles/mileage.model";
import {environment} from "../../../environments/environment";
import * as io from "socket.io-client";

@Component({
  selector: 'hvac',
  templateUrl: 'hvac.component.html',
  styleUrls: ['hvac.component.css']
})
export class HvacComponent implements OnInit, OnDestroy{
  private connection;
  private url: string = environment.service.api;
  private socket;
  private leftFront: number = 0;
  private leftRear: number = 0;
  private rightFront: number = 0;
  private rightRear: number = 0;
  private speed: Speed = {
    value: 0,
    unit: "MPH"
  };
  private mileage: Mileage = {
    value: 0,
    unit: "MI"
  };

  constructor() {
    this.socket = io.connect(this.url);
  }

  //@todo Add listeners to listen api-methods and implement your logic here
  ngOnInit() {
    this.connection = this.socket.on("speed-change", res => {
      this.speed = res.data;
    });

    this.connection = this.socket.on("mileage-change", res => {
      this.mileage = res.data;
    });

    this.connection = this.socket.on("left-front-change", res => {
      this.leftFront = res.value;
    });

    this.connection = this.socket.on("left-rear-change", res => {
      this.leftRear = res.value;
    });

    this.connection = this.socket.on("right-front-change", res => {
      this.rightFront = res.value;
    });

    this.connection = this.socket.on("right-rear-change", res => {
      this.rightRear = res.value;
    });
  }

  ngOnDestroy(){
    this.socket.disconnect();
  }
}