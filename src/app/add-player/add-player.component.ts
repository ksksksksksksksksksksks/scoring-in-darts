import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PlayerService } from 'src/app/player.service';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.scss'],
})
export class AddPlayerComponent implements OnInit {

  playerForm: FormGroup = new FormGroup({});
  nickname: string = '';
  email: string = ''; 
    
  constructor(private _router: Router,
    private playerService: PlayerService) {
    this.playerForm = new FormGroup({
      "playerNickname": new FormControl('', [
        Validators.required,
        Validators.maxLength(20)
      ]),
      "playerEmail": new FormControl('', Validators.email)  
    });
  }

  addPlayer(name: string, email: string){     
    this.playerService.addPlayer(name, email);
    //console.log(this.playerService.player);
  }

  selectPlayer() {
    this._router.navigateByUrl('');
  }

  ngOnInit(): void {
  }

}
