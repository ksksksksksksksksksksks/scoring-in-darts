import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PlayerService } from 'src/app/player.service';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.scss'],
  providers: [PlayerService]
})
export class AddPlayerComponent implements OnInit {

  playerForm: FormGroup = new FormGroup({});
  items: string[] = [];
  nickname: string = "";
  email: string = ""; 
    
  constructor(private playerService: PlayerService) {
    this.playerForm = new FormGroup({
      "playerNickname": new FormControl("", [
                        Validators.required,
                        Validators.maxLength(20)
      ]),
      "playerEmail": new FormControl("", Validators.email)  
    });
  }

  /*submit(nickname: string) {
    console.log(nickname);
  }*/

  addPlayerNickname(nickname: string){     
    this.playerService.addPlayerNickname(nickname);
    console.log(this.playerService.playerNickname);
  }

  addPlayerEmail(email: string){     
    this.playerService.addPlayerEmail(email);
    console.log(this.playerService.playerEmail);
  }

  ngOnInit(): void {
  }

}
