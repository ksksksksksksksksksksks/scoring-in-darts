import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerService } from 'src/app/player.service';
import { UserService } from 'src/app/user.service';
import { Player } from '../domain/player';

@Component({
  selector: 'app-select-game',
  templateUrl: './select-game.component.html',
  styleUrls: ['./select-game.component.scss']
})
export class SelectGameComponent implements OnInit {

  player: Player = {name: ''};
  players: Player[] = this.playerService.players;

  constructor(private router: Router, 
    private playerService: PlayerService,
    private userService: UserService) {
  }

  ngOnInit(): void {
    this.players = this.playerService.getPlayer();
  }

  addPlayer() {
    this.router.navigateByUrl('add-player');
  }

  removePlayer(player: Player){
    this.playerService.removePlayer(player);
    console.log(this.playerService.players);
    console.log(this.players);
  }

  searchPlayer(str: string){
    this.userService.searchUser(str);
  }
  
}
