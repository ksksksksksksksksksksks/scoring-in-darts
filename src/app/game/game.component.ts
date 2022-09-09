import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerService } from 'src/app/player.service';
import { GameService } from 'src/app/game.service';
import { Player } from '../domain/player';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  
  player: Player = {name: ''};
  players: Player[] = this.playerService.players;
  strInput: string = '';

  constructor(private router: Router,
    private playerService: PlayerService,
    private gameService: GameService) {
  }

  ngOnInit(): void {
  }

  selectGame() {
    this.router.navigateByUrl('');
  }

}
