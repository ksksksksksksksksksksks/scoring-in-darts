import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerService } from 'src/app/player.service';
import { GameService } from 'src/app/game.service';
import { Player } from '../domain/player';
import { FormGroup, FormControl, Validators, FormArray, AbstractControl} from '@angular/forms';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  player: Player = {name: ''};
  players: Player[] = this.playerService.players;

  cards = new FormArray<FormGroup<{name: AbstractControl<string>; points: FormArray<any>}>>([]);

  constructor(private router: Router,
    private playerService: PlayerService,
    private gameService: GameService) {
      this.players.forEach(el => {
        const name = el.name;
        this.cards.push(
          this.getCardFormGroup(name)
        );
      });
      console.log(this.cards);
  }

  private getCardFormGroup(name: string): FormGroup {
    return new FormGroup({
      name: new FormControl(name),
      points: new FormArray([
        this.getPointFormGroup(),
        this.getPointFormGroup(),
        this.getPointFormGroup()        
      ])
    });
  }

  private getPointFormGroup(): FormGroup{
    return new FormGroup({
      point: new FormControl(1, [
        Validators.required,
        Validators.min(1),
        Validators.max(60)
      ]),
      circle: new FormControl("1", Validators.required)
    });
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
  }

}

  let value = {
    cards: [
      {
        name: "john", 
        points: [
          {
            point: 1, 
            circle: 2
          }
        ]
      }
    ]
  }