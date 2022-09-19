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

  @Input() public gameType!: GameType;
  @ViewChild(AddPlayerComponent) child!: AddPlayerComponent;

  player!: Player;
  players: Player[] = this.playerService.players;
  strInput: string = '';
  // myPlayers: Player[] = [];

  constructor(private router: Router, 
    public playerService: PlayerService,
    private gameService: GameService) {
  }

  ngOnInit(): void {
    this.players = this.playerService.getPlayer();
    // this.playerService.getPlayers().subscribe( players => {  
    //   console.log("is array equal ---> ", this.players === players);   
    //   this.myPlayers = <never>players;       
    // })
  }

  // addData() {
  //   let data = this.child.form.value;
  //   this.myPlayers.push(<never>data);
  // }

  removePlayer(player: Player) {
    // let index = this.myPlayers.indexOf(<never>player);
    // this.myPlayers = this.myPlayers.filter( (value, i) => i != index);
    this.playerService.removePlayer(player);
  }

  addPlayer() {
    this.router.navigateByUrl('add-player');
  }

  // removePlayer(player: Player) {
  //   this.playerService.removePlayer(player);
  // }

  chooseGame(typeGame: GameType) {
    this.gameType = typeGame;
    this.gameService.gameType = typeGame;
  }

  start() {
    this.router.navigateByUrl('game');
    for (let i = 0; i < this.players.length; i++) {
      this.players[i].pointMove = [];
      this.playerService.players[i].leader = false;
    }  
  }
}

