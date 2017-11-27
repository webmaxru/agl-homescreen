import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-spotify-app',
  templateUrl: './spotify-app.component.html',
  styleUrls: ['./spotify-app.component.css']
})
export class SpotifyAppComponent implements OnInit {

  url = '/assets/spotify/'
  

  constructor() { }

  ngOnInit() {
  }

}
