import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerService } from 'src/app/player.service';
import { GameService } from 'src/app/game.service';
import { Player } from '../domain/player';
import { FormGroup, FormControl, Validators, FormArray, AbstractControl} from '@angular/forms';
import { VirtualTimeScheduler } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GameResultComponent } from '../game-result/game-result.component'

type GameType = "501" | "301";

interface Step {
  [k:string]: number;
}

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
  steps: Step[] = [];
  resultMessage: string = '';

  constructor(private router: Router,
    private playerService: PlayerService,
    private gameService: GameService,
    public matDialog: MatDialog) {
      this.players.forEach(el => {
        const name = el.name;
        this.cards.push(
          this.getCardFormGroup(name)
        );
      });
      this.gameType = this.gameService.gameType;
  }

  ngOnInit(): void {
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
        Validators.max(20)
      ]),
      circle: new FormControl("1", Validators.required)
    });
  }

  countPoint(gameType: GameType) {
    return gameType === "301" ? this.countPoint301() : this.countPoint501();
  }

  countPoint301() {
    
  const step: Step = {};
    for (let i = 0; i < this.cards.length; i++) {
      let pointMove: number = 0;
      let massPoint: FormArray<any> = this.cards.controls[i].controls.points as FormArray<any>;
      let massPointMove: number[] = this.gameService.players[i].pointMove as number[];
      let last: number = massPointMove[massPointMove.length - 1];
      
      for (let j = 0; j < massPoint.length; j++) {
        pointMove += massPoint.controls[j].value.point * massPoint.controls[j].value.circle;
      }

      if (massPointMove.length == 0) {
        massPointMove.push(pointMove);
      }
      else if (last + pointMove < 301) {
        massPointMove.push(last + pointMove);
      }
      else if (last + pointMove > 301) {
        massPointMove.push(last);
      }
      else if (last + pointMove == 301) {
        massPointMove.push(last + pointMove);
        //alert(this.gameService.players[i].name + ' win!');
        this.resultMessage = this.gameService.players[i].name;
        this.showResult();
      }

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

      for (let j = 0; j < massPoint.length; j++) {
        pointMove += massPoint.controls[j].value.point * massPoint.controls[j].value.circle;
      }
        
      if (massPointMove.length == 0) {
          massPointMove.push(501 - pointMove);
      }
      else if (last - pointMove > 0) {
        massPointMove.push(last - pointMove);
      }
      else if (last - pointMove < 0) {
        massPointMove.push(last);
      }
      else if (last - pointMove == 0) {
        massPointMove.push(last - pointMove);
        //alert(this.gameService.players[i].name + ' win!');
        this.resultMessage = this.gameService.players[i].name;
        this.showResult();
      }

      step[this.cards.value[i]!.name as string] = massPointMove[massPointMove.length - 1]
      console.log(this.gameService.players[i]);
    }
    this.steps.push(step);
    console.log(this.steps);

  }

  showResult() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "show-result";
    dialogConfig.height = "window.screen.height";
    dialogConfig.width = "window.screen.height";
    dialogConfig.data = this.resultMessage;
    const modalDialog = this.matDialog.open(GameResultComponent, dialogConfig);
    modalDialog.afterClosed().subscribe(result => {
      if (result === 'restart'){
        this.selectGame();
      }
    });
  }

  selectGame() {
    this.router.navigateByUrl('');
  }

}

  