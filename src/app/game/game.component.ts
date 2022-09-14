import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerService } from 'src/app/player.service';
import { GameService } from 'src/app/game.service';
import { Player } from '../domain/player';
import { FormGroup, FormControl, Validators, FormArray, AbstractControl} from '@angular/forms';
type GameType = "501" | "301";
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  @Input() public gameType!: GameType;
  player: Player = {name: ''};
  players: Player[] = this.playerService.players;
  cards = new FormArray<FormGroup<{name: AbstractControl<string>; points: FormArray<any>}>>([]);
  massPoint: number[] = [];
  steps: Step[] = [];

  constructor(private router: Router,
    private playerService: PlayerService,
    private gameService: GameService) {
      this.players.forEach(el => {
        const name = el.name;
        this.cards.push(
          this.getCardFormGroup(name)
        );
      });
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

  countPoint(){
    if (this.gameService.gameType === '301') {
      this.countPoint301();
    }
    else if (this.gameService.gameType === '501') {
      this.countPoint501();
    }
  }

  countPoint301() {
    
  const step: Step = {};
    for (let i = 0; i < this.cards.length; i++) {
      let pointMove: number = 0;
      let massPoint: FormArray<any> = this.cards.controls[i].controls.points as FormArray<any>;
      let massPointMove: number[] = this.gameService.players[i].pointMove as number[];
      let last: number = massPointMove[massPointMove.length - 1];
      this.massPoint = massPointMove;
      
      for (let j = 0; j < massPoint.length; j++) {
        pointMove += massPoint.controls[j].value.point * massPoint.controls[j].value.circle;
      }

      if (massPointMove.length == 0) {
        massPointMove.push(pointMove);
      }
      else if (massPointMove.length !== 0 && last + pointMove < 301) {
        massPointMove.push(last + pointMove);
      }
      else if (massPointMove.length !== 0 && last + pointMove > 301) {
        massPointMove.push(last);
      }
      else if (massPointMove.length !== 0 && last + pointMove == 301) {
        massPointMove.push(last + pointMove);
        alert(this.gameService.players[i].name + ' win!');
      }

      this.gameService.players[i].point = massPointMove[massPointMove.length - 1];

      step[this.cards.value[i]!.name as string] = massPointMove[massPointMove.length - 1]
      console.log(this.gameService.players[i]);
    }
    this.steps.push(step);
    console.log(this.steps);
  }

  countPoint501() {
    const step: Step = {};
    for (let i = 0; i < this.cards.length; i++) {
      let pointMove: number = 0;
      let massPoint: FormArray<any> = this.cards.controls[i].controls.points as FormArray<any>;
      let massPointMove: number[] = this.gameService.players[i].pointMove as number[];
      let last: number = massPointMove[massPointMove.length - 1];
      this.massPoint = massPointMove;

      for (let j = 0; j < massPoint.length; j++) {
        pointMove += massPoint.controls[j].value.point * massPoint.controls[j].value.circle;
      }
        
      if (massPointMove.length == 0) {
          massPointMove.push(501 - pointMove);
      }
      else if (massPointMove.length !== 0 && massPointMove.length as number < 20) {
        if (last - pointMove == 0){
          massPointMove.push(last - pointMove);
          alert(this.gameService.players[i].name + ' win!');
        }
        else {
          massPointMove.push(last - pointMove);
        }
      }
      /*else if (massPointMove.length !== 0 && massPointMove.length as number >= 20 && massPointMove.length as number < 30) {
        massPointMove.push(last - pointMove);
      }*/

      this.gameService.players[i].point = massPointMove[massPointMove.length - 1];

      step[this.cards.value[i]!.name as string] = massPointMove[massPointMove.length - 1]
      console.log(this.gameService.players[i]);
    }
    this.steps.push(step);
    console.log(this.steps);

  }

  selectGame() {
    this.router.navigateByUrl('');
  }
  
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
  
  // countPoint() {
  //   for (let i = 0; i < this.cards.length; i++) {
  //     let pointMove: number = 0;
  //     let massPoint: FormArray<any> = this.cards.controls[i].controls.points as FormArray<any>;
  //     let massPointMove: number[] = this.gameService.players[i].pointMove as number[];
  //     this.massPoint = massPointMove;
      
  //     for (let j = 0; j < massPoint.length; j++){
  //       pointMove += massPoint.controls[j].value.point * massPoint.controls[j].value.circle;
  //     }

  //     if (massPointMove.length == 0){
  //       massPointMove.push(pointMove);
  //     }

  //     if (massPointMove.length !== 0){
  //       let last: number = massPointMove[massPointMove.length - 1];
  //       massPointMove.push(last + pointMove);
  //     }

  //     this.gameService.players[i].point = massPointMove[massPointMove.length - 1];
  //     console.log(this.gameService.players[i]);
  //   }
  // }

  interface Step {
    [k:string]: number;
  }
  
  