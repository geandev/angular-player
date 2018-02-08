import { Component } from '@angular/core';
import { Howl, Howler } from 'howler';
import { sample } from 'rxjs/operator/sample';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private sound: Howl
  private music: string

  constructor() {
    this.music = "froid.wav"
    this.sound = new Howl({
      src: [`http://localhost:5000/api/songs/${this.music}`],
      html5: true,
      format: ['wav']
    })
  }

  togglePlay() {
    this.sound.play();
  }

  stop() {
    this.sound.pause()
  }
}
