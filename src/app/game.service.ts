import { Injectable } from '@angular/core';
import { Player } from './domain/player';
import { PlayerService } from 'src/app/player.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  players: Player[] = this.playerService.players;

  constructor(private playerService: PlayerService) {
  }

}
