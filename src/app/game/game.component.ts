import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
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
  styleUrls: ['./game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
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
        Validators.max(20),
        Validators.pattern("^[0-9]*$")
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
    let leaderPointStep = this.gameService.players[0].pointStep as number[];
    let max: number = leaderPointStep[leaderPointStep.length - 1];
    let min: number = leaderPointStep[leaderPointStep.length - 1];
    this.playerService.players[0].leader = true;

    for (let i: number = 1; i < this.playerService.players.length; i++){
      let arrPointStep: number[] = this.gameService.players[i].pointStep as number[];

      if (gameType === '301') {
        if (arrPointStep[arrPointStep.length - 1] > max) {
          max = arrPointStep[arrPointStep.length - 1];
          this.removeLeader();
          this.playerService.players[i].leader = true;
        }

        if (arrPointStep[arrPointStep.length - 1] === max) {
          this.playerService.players[i].leader = true;
        }
      }

      if (gameType === '501') {
        if (arrPointStep[arrPointStep.length - 1] < min) {
          min = arrPointStep[arrPointStep.length - 1];
          this.removeLeader();
          this.playerService.players[i].leader = true;
        }

        if (arrPointStep[arrPointStep.length - 1] === min) {
          this.playerService.players[i].leader = true;
        }
      }
    }    
  }

  countPoint301() { 
    const step: Step = {};

    for (let i = 0; i < this.cards.length; i++) {
      let pointStep: number = 0;
      let arrPoint: FormArray<any> = this.cards.controls[i].controls.points as FormArray<any>;
      let arrPointStep: number[] = this.gameService.players[i].pointStep as number[];
      let last: number = arrPointStep[arrPointStep.length - 1];
      
      for (let j = 0; j < arrPoint.length; j++) {
        pointStep += arrPoint.controls[j].value.point * arrPoint.controls[j].value.circle;
      }

      if (arrPointStep.length === 0) {
        arrPointStep.push(pointStep);
        this.showLeader(this.gameService.gameType);
      }
      else if (last + pointStep < 301) {
        arrPointStep.push(last + pointStep);
        this.showLeader(this.gameService.gameType);
      }
      else if (last + pointStep > 301) {
        arrPointStep.push(last);
        this.showLeader(this.gameService.gameType);
      }
      else if (last + pointStep === 301) {
        arrPointStep.push(last + pointStep);
        this.resultMessage = this.gameService.players[i].name;
        this.showResult();
      }

      step[this.cards.value[i]!.name as string] = arrPointStep[arrPointStep.length - 1];
      // console.log(this.gameService.players[i]);
    }

    this.steps.push(step);
    // console.log(this.steps);
  }

  countPoint501() {
    const step: Step = {};

    for (let i = 0; i < this.cards.length; i++) {
      let pointStep: number = 0;
      let arrPoint: FormArray<any> = this.cards.controls[i].controls.points as FormArray<any>;
      let arrPointStep: number[] = this.gameService.players[i].pointStep as number[];
      let last: number = arrPointStep[arrPointStep.length - 1];

      for (let j = 0; j < arrPoint.length; j++) {
        pointStep += arrPoint.controls[j].value.point * arrPoint.controls[j].value.circle;
      }
        
      if (arrPointStep.length === 0) {
        arrPointStep.push(501 - pointStep);
        this.showLeader(this.gameService.gameType);
      }
      else if (last - pointStep > 0) {
        arrPointStep.push(last - pointStep);
        this.showLeader(this.gameService.gameType);
      }
      else if (last - pointStep < 0) {
        arrPointStep.push(last);
        this.showLeader(this.gameService.gameType);
      }
      else if (last - pointStep === 0) {
        arrPointStep.push(last - pointStep);
        this.resultMessage = this.gameService.players[i].name;
        this.showResult();
      }

      step[this.cards.value[i]!.name as string] = arrPointStep[arrPointStep.length - 1];
      // console.log(this.gameService.players[i]);
    }

    this.steps.push(step);
    // console.log(this.steps);
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

  