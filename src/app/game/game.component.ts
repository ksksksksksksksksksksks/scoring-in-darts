import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerService } from 'src/app/player.service';
import { GameService } from 'src/app/game.service';
import { Player } from '../domain/player';
import { FormGroup, FormControl, Validators, FormArray, AbstractControl} from '@angular/forms';
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

export class GameComponent {
  
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

  removeLeader() {
    for (let i: number = 0; i < this.playerService.players.length; i++){
      this.playerService.players[i].leader = false;
    }
  }

  showLeader(gameType: GameType) {
    
      this.removeLeader();
      let leaderPointMove = this.gameService.players[0].pointMove as number[];
      let max: number = leaderPointMove[leaderPointMove.length - 1];
      let min: number = leaderPointMove[leaderPointMove.length - 1];
      this.playerService.players[0].leader = true;

      for (let i: number = 1; i < this.playerService.players.length; i++){
        let massPointMove: number[] = this.gameService.players[i].pointMove as number[];

        if (gameType === '301') {
          if (massPointMove[massPointMove.length - 1] > max) {
            max = massPointMove[massPointMove.length - 1];
            this.removeLeader();
            this.playerService.players[i].leader = true;
          }

          if (massPointMove[massPointMove.length - 1] === max) {
            this.playerService.players[i].leader = true;
          }
        }

        if (gameType === '501') {
          if (massPointMove[massPointMove.length - 1] < min) {
            min = massPointMove[massPointMove.length - 1];
            this.removeLeader();
            this.playerService.players[i].leader = true;
          }

          if (massPointMove[massPointMove.length - 1] === min) {
            this.playerService.players[i].leader = true;
          }
        }
      }    
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

      if (massPointMove.length === 0) {
        massPointMove.push(pointMove);
        this.showLeader(this.gameService.gameType);
      }
      else if (last + pointMove < 301) {
        massPointMove.push(last + pointMove);
        this.showLeader(this.gameService.gameType);
      }
      else if (last + pointMove > 301) {
        massPointMove.push(last);
        this.showLeader(this.gameService.gameType);
      }
      else if (last + pointMove === 301) {
        massPointMove.push(last + pointMove);
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
        
      if (massPointMove.length === 0) {
        massPointMove.push(501 - pointMove);
        this.showLeader(this.gameService.gameType);
      }
      else if (last - pointMove > 0) {
        massPointMove.push(last - pointMove);
        this.showLeader(this.gameService.gameType);
      }
      else if (last - pointMove < 0) {
        massPointMove.push(last);
        this.showLeader(this.gameService.gameType);
      }
      else if (last - pointMove === 0) {
        massPointMove.push(last - pointMove);
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

  