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

  constructor(private _router: Router, 
    private playerService: PlayerService) { }

  ngOnInit(): void {
    this.items = this.playerService.getPlayer();
    console.log(this.playerService.player);
  }

  addPlayer() {
    this._router.navigateByUrl('add-player');
  }

}
