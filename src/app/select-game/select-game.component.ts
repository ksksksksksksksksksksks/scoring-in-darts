import { Component, OnInit, ViewChild, Input, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerService } from 'src/app/player.service';
import { GameService } from 'src/app/game.service';
import { Player } from '../domain/player';
import { AddPlayerComponent } from  '../add-player/add-player.component';

type GameType = "501" | "301";

@Component({
  selector: 'app-select-game',
  templateUrl: './select-game.component.html',
  styleUrls: ['./select-game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectGameComponent implements OnInit {
  
  @ViewChild(AddPlayerComponent) child!: AddPlayerComponent;
  public gameType!: GameType;
  public players: Player[] = this.playerService.players;
  public strInput: string = '';

  constructor(private router: Router, 
    public playerService: PlayerService,
    private gameService: GameService) {
  }

  ngOnInit(): void {
    this.players = this.playerService.getPlayers();
  }

  removePlayer(player: Player) {
    this.playerService.removePlayer(player);
  }

  addPlayer() {
    this.router.navigateByUrl('add-player');
  }

  chooseGame(typeGame: GameType) {
    this.gameType = typeGame;
    this.gameService.gameType = typeGame;
  }

  start() {
    this.router.navigateByUrl('game');
    for (let i = 0; i < this.players.length; i++) {
      this.players[i].pointStep = [];
      this.playerService.players[i].leader = false;
    }  
  }
}

