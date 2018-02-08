import { Component } from '@angular/core';
import { Howl, Howler } from 'howler';
import { Observable } from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private sound: Howl
  private music: string
  private maxDuration: number
  private currentDuration: number

  constructor() {
    this.music = "froid.wav"
    this.currentDuration = 0
    this.maxDuration = 0
    this.sound = new Howl({
      src: [`./songs/${this.music}`],
      html5: true,
      format: ['wav'],
      onplay: s => {
        this.maxDuration = Math.round(this.sound.duration(s))
        Observable.interval(1000).forEach(() => {
          this.currentDuration = Math.round(this.sound.seek() as number)
          console.info(this.currentDuration)
        })
      },
    })
  }

  play() {
    this.sound.play();
  }

  pause() {
    this.sound.pause();
  }

  next() {
    let valueSeek = (this.sound.seek() as number) + 20;
    this.sound.seek(valueSeek)
  }

  previous() {
    let valueSeek = (this.sound.seek() as number) - 20;
    this.sound.seek(valueSeek)
  }

}
