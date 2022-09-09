import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerService } from 'src/app/player.service';
import { GameService } from 'src/app/game.service';
import { Player } from '../domain/player';


@Component({
  selector: 'app-select-game',
  templateUrl: './select-game.component.html',
  styleUrls: ['./select-game.component.scss']
})
export class SelectGameComponent implements OnInit {

  player: Player = {name: ''};
  players: Player[] = this.playerService.players;
  strInput: string = '';

  constructor(private router: Router, 
    private playerService: PlayerService,
    private gameService: GameService) {
  }

  ngOnInit(): void {
    this.players = this.playerService.getPlayer();
  }

  addPlayer() {
    this.router.navigateByUrl('add-player');
  }

  removePlayer(player: Player){
    this.playerService.removePlayer(player);
  }

  chooseGame(typeGame: string){
    this.gameService.typeGame = typeGame;
    console.log(this.gameService.typeGame);
  }
  
}
