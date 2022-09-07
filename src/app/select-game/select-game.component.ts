import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerService } from 'src/app/player.service';

@Component({
  selector: 'app-select-game',
  templateUrl: './select-game.component.html',
  styleUrls: ['./select-game.component.scss']
})
export class SelectGameComponent implements OnInit {

  items: {} = {};
  itemsTable: [{name: string, email: string, isRemoved?: boolean}] = this.playerService.player;

  constructor(private _router: Router, 
    private playerService: PlayerService) { }

  ngOnInit(): void {
    this.items = this.playerService.getPlayer();
    console.log(this.playerService.player);
  }

  addPlayer() {
    this._router.navigateByUrl('add-player');
  }

  removePlayer(name: string, email: string){
    for (let i = 0; i < this.itemsTable.length; i++){
      if (this.itemsTable[i].name == name && this.itemsTable[i].email == email){
        this.itemsTable[i].isRemoved = true;
      }
    }
  }

}
