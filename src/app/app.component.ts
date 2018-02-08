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
  private maxListenedDuration: number
  private status: string
  private statusClass: string
  private pos: number = 0;

  private currentDuration: number

  constructor() {
    this.playList(this.pos);
    this.status = "Play"
  }

  private playList(index: number) {
    let playlist = ['./songs/the-imperial-suite.wav', './songs/concerning-hobbits.wav']
    this.currentDuration = 0
    this.maxListenedDuration = 0;
    this.maxDuration = 0
    this.sound = new Howl({
      src: playlist[index],
      html5: true,
      format: ['wav'],
      onplay: s => {
        this.music = playlist[index]
        this.maxDuration = Math.round(this.sound.duration(s))
        Observable.interval(1000).subscribe(() => {
          var duration = Math.round(<number>this.sound.seek())
          this.currentDuration = duration
          this.maxListenedDuration = duration
        })
      }
    })
  }

  toggle() {
    if (this.sound.playing())
      this.sound.pause();
    else
      this.sound.play();
    this.status = this.sound.playing() ? "Pause" : "Play"
  }

  next() {
    if (this.pos >= this.playList.length) return;
    this.pos++;
    if (this.sound.playing())
      this.sound.stop()
    this.playList(this.pos);
    this.toggle();
  }

  prev() {
    if (this.pos <= 0) return;    
    this.pos--;
    if (this.sound.playing())
      this.sound.stop()
    this.playList(this.pos);
    this.toggle();
  }

  playNext() {

  }

  seekChange() {
    
    console.info(this.currentDuration);
    console.info(this.maxListenedDuration);

    this.sound.seek(this.currentDuration)
  }

}
