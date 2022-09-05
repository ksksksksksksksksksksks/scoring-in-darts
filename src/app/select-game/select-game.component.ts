import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-game',
  templateUrl: './select-game.component.html',
  styleUrls: ['./select-game.component.scss']
})
export class SelectGameComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit(): void {
  }

  addPlayer() {
    this._router.navigateByUrl('add-player');
  }

}
