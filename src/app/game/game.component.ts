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
  
  //pointGroup: FormGroup;
  cardGroup: FormGroup = new FormGroup({});

  cards = new FormArray([]);
  points = new FormArray([]);
  
  /*cardGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    points: new FormArray([
      new FormGroup({
        point: new FormControl(1, [
          Validators.required,
          Validators.min(1),
          Validators.max(60)
        ]),
        circle: new FormControl(1, Validators.required)
      })
    ])
  });*/

  constructor(private router: Router,
    private playerService: PlayerService,
    private gameService: GameService) {
      this.players.forEach(el => {
        const name = el.name;
        this.points = <never>new FormArray([
          new FormGroup({
            point: new FormControl(1, [
              Validators.required,
              Validators.min(1),
              Validators.max(60)
            ]),
            circle: new FormControl(1, Validators.required)
          })
        ]);
        this.cardGroup = new FormGroup({
          name: new FormControl(name),
          points: this.points
        });
        this.cards.push(<never>this.cardGroup);
      });
      console.log(this.cards);
  }

  selectGame() {
    this.router.navigateByUrl('');
  }

  /*addCard() {
    this.cards.push(<never>this.cardGroup);
  }*/

  /*get points() {
    return this.cardGroup.get('points') as FormArray;
  }*/
  
  ngOnInit(): void {
    console.log(this.playerService.players);
  }

}

  /*addPoint() {
    (<FormArray>this.cardGroup.get('points')).push(<never>this.pointGroup);
  }
  */

   /*for(let i = 0; i < 3; i++) {
    this.points.push(new FormGroup({
      point: new FormControl(1, [
        Validators.required,
        Validators.min(1),
        Validators.max(60)
      ]),
      circle: new FormControl(1, Validators.required)
      }));
  }*/