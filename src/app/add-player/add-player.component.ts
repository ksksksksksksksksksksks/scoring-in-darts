import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PlayerService } from 'src/app/player.service';
import { Player } from '../domain/player';
import { AbstractControl, ValidatorFn  } from '@angular/forms';
import { GameService } from 'src/app/game.service';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.scss'],
})
export class AddPlayerComponent implements OnInit {

  ngOnInit(): void {
  }

  form: FormGroup;
    
  constructor(private router: Router,
    private playerService: PlayerService,
    private gameService: GameService) {
      this.form = new FormGroup({
        name: new FormControl('', [
          Validators.required,
          Validators.maxLength(20),
          this.uniqueNameValidator
        ]),
        email: new FormControl('', Validators.email)  
      });
  }

  addPlayer(){     
    this.playerService.addPlayer(this.form.value);
    this.router.navigateByUrl('');
  }

  uniqueNameValidator = (control: FormControl) => {
    for (let i: number = 0; i < this.playerService.players.length; i++){
      if (control.value === this.playerService.players[i].name){
        return {uniqueNameValidator: 'the name already exists'};
      }
    }
    return null;
  }

}
