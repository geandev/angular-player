import { Component } from '@angular/core';
import { Howl, Howler } from 'howler';
import { Observable } from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  host: { '(window:keydown)': 'hotkeys($event)' },
})

export class AppComponent {
  private sound: Howl
  private music: string
  private maxDuration: number
  private maxListenedDuration: number
  private status: string
  private statusClass: string
  private pos: number = 0;
  private elapsedTime: string = "0:00";
  private elapsedTime2: string;
  private currentRate: number;

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
    this.currentRate = 1;
    this.sound = new Howl({
      src: playlist[index],
      html5: true,
      format: ['wav'],
      onplay: s => {
        this.music = playlist[index]
        this.maxDuration = Math.round(this.sound.duration(s))
        Observable.interval(1000).subscribe(() => {
          let duration = Math.round(<number>this.sound.seek())
          this.currentDuration = duration
          this.maxListenedDuration = duration > this.maxListenedDuration ? duration : this.maxListenedDuration
          this.setElapsedTime()
        })
        this.setElapsedTime()
      }
    })
  }
  formatTime(secs: number): string {
    var minutes = Math.floor(secs / 60) || 0;
    var seconds = (secs - minutes * 60) || 0;

    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }

  setElapsedTime() {
    this.elapsedTime = `(${this.formatTime(this.maxDuration - this.currentDuration)})`;
    this.elapsedTime2 = `(${this.formatTime(this.currentDuration)} - ${this.formatTime(this.maxDuration)})`;
  }

  toggle() {
    if (this.sound.playing())
      this.sound.pause();
    else
      this.sound.play();
    this.status = this.sound.playing() ? "Pause" : "Play"
  }

  submit() {
    if (this.pos >= this.playList.length) this.pos = -1;
    this.pos++;
    if (this.sound.playing())
      this.sound.stop()
    this.playList(this.pos);
    this.toggle();
    this.status = "Pause"
    this.sound.seek(this.currentDuration + 1)
  }

  next() {
    let newTime = this.currentDuration + 5;
    this.sound.seek(newTime > this.maxListenedDuration ? this.maxListenedDuration : newTime)
  }

  prev() {
    var seekPos = this.currentDuration - 5;

    this.sound.seek(seekPos < 0 ? 0 : seekPos)
  }

  seekChange() {

    this.sound.seek(this.currentDuration > this.maxListenedDuration ? this.maxListenedDuration : this.currentDuration)
  }

  hotkeys(event: any) {

    if (event.keyCode == 32 && event.shiftKey)
      this.toggle();
    if (event.keyCode == 13 && event.shiftKey)
      this.submit();
    if (event.keyCode == 70 && event.shiftKey)
      this.next();
    if (event.keyCode == 82 && event.shiftKey)
      this.prev();
  }

}