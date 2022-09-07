import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerService } from 'src/app/player.service';
import { Player } from '../domain/player';

@Component({
  selector: 'app-select-game',
  templateUrl: './select-game.component.html',
  styleUrls: ['./select-game.component.scss']
})
export class SelectGameComponent implements OnInit {

  items: Player = {name: ''};
  itemsTable: Player[] = this.playerService.players;

  constructor(private _router: Router, 
    private playerService: PlayerService) {
    }

  ngOnInit(): void {
    this.itemsTable = this.playerService.getPlayer();
  }

  addPlayer() {
    this._router.navigateByUrl('add-player');
  }

  removePlayer(player: Player){
    this.playerService.removePlayer(player);
    console.log(this.playerService.players);
  }
  

}
