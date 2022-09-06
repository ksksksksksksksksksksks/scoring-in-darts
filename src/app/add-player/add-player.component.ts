import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.scss']
})
export class AddPlayerComponent implements OnInit {

  playerForm: FormGroup = new FormGroup({});
    
  constructor() {
    this.playerForm = new FormGroup({
      "playerNickname": new FormControl("", [
                        Validators.required,
                        Validators.maxLength(20)
      ]),
      "playerEmail": new FormControl("", Validators.email)  
    });
  }

  submit() {
    console.log(this.playerForm);
  }

  ngOnInit(): void {
  }

}
