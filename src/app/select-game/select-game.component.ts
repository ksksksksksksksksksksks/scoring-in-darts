import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerService } from 'src/app/player.service';
import { GameService } from 'src/app/game.service';
import { Player } from '../domain/player';
import { GameComponent } from '../game/game.component';

type GameType = "501" | "301";


@Component({
  selector: 'app-select-game',
  templateUrl: './select-game.component.html',
  styleUrls: ['./select-game.component.scss']
})
export class SelectGameComponent implements OnInit {

  ngOnInit(): void {
    this.players = this.playerService.getPlayer();
  }

  @Input() public gameType!: GameType;
  player: Player = {name: ''};
  players: Player[] = this.playerService.players;
  strInput: string = '';

  constructor(private router: Router, 
    private playerService: PlayerService,
    private gameService: GameService) {
  }

  addPlayer() {
    this.router.navigateByUrl('add-player');
  }

  removePlayer(player: Player){
    this.playerService.removePlayer(player);
  }

  chooseGame(typeGame: GameType){
    this.gameType = typeGame;
    this.gameService.gameType = typeGame;

    //console.log(this.gameService.gameType);
  }

  start() {
    this.router.navigateByUrl('game');
    for (let i = 0; i < this.players.length; i++){
      this.players[i].pointMove = [];
    }  
  }
  
}

