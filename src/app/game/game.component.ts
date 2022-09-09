import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerService } from 'src/app/player.service';
import { GameService } from 'src/app/game.service';
import { Player } from '../domain/player';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  player: Player = {name: ''};
  players: Player[] = this.playerService.players;

  cards = new FormArray([]);
  points = new FormArray([]);

  pointGroup: FormGroup;
  cardGroup: FormGroup;

  constructor(private router: Router,
    private playerService: PlayerService,
    private gameService: GameService) {
      this.pointGroup = new FormGroup({
        point: new FormControl(1, [
          Validators.required,
          Validators.min(1),
          Validators.max(60)
        ]),
        circle: new FormControl(1, Validators.required)  
      });
      this.cardGroup = new FormGroup({
        name: new FormControl('', Validators.required),
        card: this.points
      });
  }

  selectGame() {
    this.router.navigateByUrl('');
  }

  addPointGroup() {
    this.points.push(<never>this.pointGroup);
  }

  addCardGroup() {
    this.cards.push(<never>this.cardGroup);
  }

  get card() {
    return this.cardGroup.get('card') as FormArray;
  }
  
  ngOnInit(): void {
  }

}
