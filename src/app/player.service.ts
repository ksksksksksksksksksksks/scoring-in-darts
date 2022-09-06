import { Injectable } from '@angular/core';
import { AddPlayerComponent } from './add-player/add-player.component';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  
  public playerNickname: string[] = [];
  public playerEmail: string[] = [];

  constructor() { }
      
  getPlayer(): string[] {    
    return this.playerNickname;
  }

  addPlayerNickname(nickname: string) {
    this.playerNickname.push(nickname);
  }

  addPlayerEmail(email: string) {
    this.playerEmail.push(email);
  }

}
