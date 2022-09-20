import { Injectable, Input } from '@angular/core';
import { Player } from './domain/player';
import { PlayerService } from 'src/app/player.service';
type GameType = "501" | "301";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  @Input() public gameType!: GameType;
  player: Player = {name: ''};
  players: Player[] = this.playerService.players;

  constructor(private playerService: PlayerService) {
    for (let i = 0; i < this.players.length; i++){
      this.players[i].pointStep = [];
    }  
  }

}
