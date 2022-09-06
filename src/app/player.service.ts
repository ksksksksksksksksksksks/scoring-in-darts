import { Injectable } from '@angular/core';
import { AddPlayerComponent } from './add-player/add-player.component';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  
  public player: [{name: string, email: string}] = [{name: '', email: ''}];

  constructor() { }
      
  getPlayer(): {} {    
    return this.player;
  }

  addPlayer(name: string, email: string) {
    this.player.push({name, email});
  }

}
