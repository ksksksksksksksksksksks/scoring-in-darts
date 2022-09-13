import { Injectable } from '@angular/core';
import { Player } from './domain/player';
import { PlayerService } from 'src/app/player.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  typeGame: string = '';
  player: Player = {name: ''};
  players: Player[] = this.playerService.players;

  constructor(private playerService: PlayerService) {
    for (let i = 0; i < this.players.length; i++){
      this.players[i].pointMove = [];
    }  
  }

}
