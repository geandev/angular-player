import { Component } from '@angular/core';
import { Howl, Howler } from 'howler';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor() {
    debugger
    const sound = new Howl({
      src: ['http://localhost:5000/api/songs/froid.wav'],
      html5: true,
      format: ['wav']
    })
    sound.play();
  }
}
